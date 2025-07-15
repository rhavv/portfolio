import { useEffect, useState } from "react";

function Header() {
  const [move, setMove] = useState(false); // controls the movement

  useEffect(() => {
    const timer = setTimeout(() => {
      setMove(true); // trigger the move after 2.5 seconds
    }, 2500);

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <h1
        className={`
          text-6xl font-bold transition-all duration-1000
          ${move
            ? "absolute top-4 left-4 text-left text-3xl"
            : "flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}
        `}
      >
        My name is Cesar Gonzalez! 🤓
      </h1>
    </div>
  );
}

export default Header;
