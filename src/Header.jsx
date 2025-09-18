import { TypeAnimation } from "react-type-animation";
import { useMemo } from "react";

function Header({ className = "" }) {
  const faces = [":)", ":T", ":P", "O.o"];

  const randomFace = useMemo(() => faces[Math.floor(Math.random() * faces.length)], []);

  return (
    <>
      <header className={`sticky top-0 w-full bg-white border-b border-neutral-300 px-7 p-3 flex items-center shadow-sm ${className}`}>
        <a
          href="#"
          className="text-2xl font-mono font-light text-neutral-700 tracking-tight "
        >
          <span className="inline-block w-[14ch] whitespace-nowrap leading-none align-middle">
            <TypeAnimation
              sequence={[
                "",
                800,
                "Cesr ",
                100,
                `Cesar Gonz`, // maybe add refresh and new face everytime
                100,
                `Cesar Gonzalez`, // maybe add refresh and new face everytime
                200,
                `Cesar Gonzalez ${randomFace}`, // maybe add refresh and new face everytime
                800,

                "Cesar Gonzalez",
                2100,
              ]}
              speed={20}
              repeat={0}
              cursor={false}
              style={{ display: "inline-block" }}
            ></TypeAnimation>
          </span>

        </a>

        <nav className="ml-auto flex items-center gap-8 font-mono text-xs text-neutral-700">
          <a className="px-2 py-1 rounded-md border shadow-sm border-neutral-200 transition-colors duration-300 hover:bg-neutral-100" href="https://www.linkedin.com/in/cesargonzalezcs/">linkedin</a>
          <a className="px-2 py-1 rounded-md border shadow-sm border-neutral-200 transition-colors duration-300 hover:bg-neutral-100" href="#projects">projects</a>
          <a className="px-2 py-1 rounded-md border shadow-sm border-neutral-200 transition-colors duration-300 hover:bg-neutral-100" href="#contact">contact</a>
          <a className="px-2 py-1 font-semibold rounded-lg shadow-sm border transition-colors duration-300 hover:bg-neutral-100 border-neutral-200" href="/resume.pdf">resume</a>
        </nav>
      </header>
    </>
  );
}
export default Header;
