// src/App.jsx
import BackgroundParticles from "./BackgroundParticles";
import Header from "./Header.jsx";
import About from "./About.jsx";
import Card from "./Card.jsx";
import { useEffect, useState } from "react";

function App() {
  const [load, setLoad] = useState(false);
  useEffect(() => setLoad(true), []);
  const fadeClass = load ? "opacity-100 transition-opacity duration-1000" : "opacity-0";

  return (
    <>
      {/* Fixed, site-wide background */}
      <BackgroundParticles
        // You can tweak these if you want a denser/sparser mesh or darker lines:
        // baseDensity={0.00012}
        // color="#0a0a0a"
        // linkDistance={130}
      />

      <Header className={fadeClass} />
      <main className={`pt-16 px-6 ${fadeClass}`}>
        <About />
        <div className="flex flex-col justify-center items-center max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card /><Card /><Card /><Card />
          <Card /><Card /><Card /><Card />
          <Card /><Card /><Card /><Card />
          <Card /><Card /><Card /><Card />
        </div>
      </main>
    </>
  );
}

export default App;
