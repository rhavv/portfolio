// src/BackgroundParticles.jsx
import { useEffect, useRef } from "react";

/**
 * Floating particle net (no mouse effects).
 * - Longer links / higher connectivity, but with hard caps for performance.
 * - Fixed behind all content.
 * - Respects prefers-reduced-motion.
 */
export default function BackgroundParticles({
  baseDensity = 0.00010,   // particles per pixel (viewport-scaled)
  maxSpeed = 0.14,          // px per frame drift
  linkDistance = 180,       // how far particles can connect (px @ 1x DPR)
  maxLinksPerParticle = 3,  // per-particle cap to avoid hairballs
  maxLinesPerFrame = 800,   // global cap per frame
  dotSize = 2,
  lineOpacity = 0.16,
  color = "#0f172a",
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);
  const dprRef = useRef(1);
  const reducedRef = useRef(false);

  const rnd = (min, max) => min + Math.random() * (max - min);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    // Reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;
    const onMQ = (e) => (reducedRef.current = e.matches);
    mq.addEventListener?.("change", onMQ);

    // Size / DPR
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dprRef.current = window.devicePixelRatio || 1;
      canvas.width = Math.floor(w * dprRef.current);
      canvas.height = Math.floor(h * dprRef.current);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);

      // Rebuild particle set on resize
      const target = Math.max(18, Math.floor(w * h * baseDensity));
      const arr = [];
      for (let i = 0; i < target; i++) {
        arr.push({
          x: rnd(0, w),
          y: rnd(0, h),
          vx: rnd(-maxSpeed, maxSpeed),
          vy: rnd(-maxSpeed, maxSpeed),
        });
      }
      particlesRef.current = arr;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (!canvas.isConnected) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const particles = particlesRef.current;

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Update + draw dots
      ctx.fillStyle = color;
      const sp = dprRef.current;
      for (const p of particles) {
        p.x += p.vx * sp;
        p.y += p.vy * sp;

        // gentle wrap
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Lines (capped for sanity)
      let linesDrawn = 0;
      const maxD = linkDistance;
      const maxD2 = maxD * maxD;
      ctx.strokeStyle = color;

      // Track how many links a particle has drawn this frame
      const links = new Uint8Array(particles.length);

      for (let i = 0; i < particles.length; i++) {
        if (linesDrawn >= maxLinesPerFrame) break;

        let linksLeft = maxLinksPerParticle - links[i];
        if (linksLeft <= 0) continue;

        for (let j = i + 1; j < particles.length; j++) {
          if (linksLeft <= 0 || linesDrawn >= maxLinesPerFrame) break;
          if (links[j] >= maxLinksPerParticle) continue;

          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;

          if (d2 <= maxD2) {
            const d = Math.sqrt(d2);
            const alpha = lineOpacity * (1 - d / maxD);
            if (alpha > 0.01) {
              ctx.globalAlpha = alpha;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
              ctx.globalAlpha = 1;
              linesDrawn++;
              links[i]++; links[j]++;
              linksLeft--;
            }
          }
        }
      }

      if (!reducedRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    // First frame (even if reduced)
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      mq.removeEventListener?.("change", onMQ);
    };
  }, [
    baseDensity,
    color,
    dotSize,
    lineOpacity,
    linkDistance,
    maxLinksPerParticle,
    maxLinesPerFrame,
    maxSpeed,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
