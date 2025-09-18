function About() {
    return (
        <section id="about" className="flex flex-col items-center justify-center  px-6 py-20 ">
            <div className="max-w-2xl border border-neutral-300 rounded-md p-6 shadow-md bg-white">
                <h2 className="text-3xl font-mono mb-4 flex flex-col items-center">About Me</h2>
                <p className="font-mono text-lg text-neutral-700 leading-relaxed">
                    Hi, I’m Cesar Gonzalez, a Computer Science graduate from UC Irvine with a
                    focus on data analytics, front-end development, and UI/UX design.
                    Through projects like AquaRest and the UCI Capstone Archive, I’ve built
                    responsive applications with React, Tailwind CSS, and PostgreSQL. I’m
                    passionate about creating clean, intuitive solutions that simplify
                    complex workflows. When I’m not coding, you’ll probably find me playing
                    video games or tinkering with new tech projects.
                </p>
            </div>
        </section>
    );
}
export default About;
