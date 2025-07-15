// CursorTrail.jsx
import { useEffect } from 'react';

const CursorTrail = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const dot = document.createElement('div');

      // Tailwind utility classes via classList
      dot.classList.add(
        'fixed',
        'w-2', 'h-2',
        'rounded',
        'bg-blue-500/70',
        'pointer-events-none',
        'z-[9999]',
        'transform',
        'translate-x-[-50%]',
        'translate-y-[-50%]',
        'animate-fadeOutTrail'
      );

      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      document.body.appendChild(dot);

      setTimeout(() => {
        dot.remove();
      }, 500); // match animation duration
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null;
};

export default CursorTrail;
