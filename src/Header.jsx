import { useEffect, useState } from "react";
import CursorTrail from './CursorTrail';

function Header() {
    const [fade, setFade] = useState(false);
    const [step, setStep] = useState(0);
    const [shrink, setShrink] = useState(false);
    const [next, setNext] = useState(0);

    const fadeClass = fade
        ? "opacity-100 translate-x-0"
        : "opacity-0 -translate-x-[40px]";

    const baseClass = "transition-all duration-1000 transform";

    const shrinkClass = shrink
        ? "text-3xl font-bold scale-125"
        : "scale-90 font-bold";

    // Add y-translation when next === 1
    const moveUpClass = next === 1 ? "translate-y-[-30px]" : "translate-y-0";

    useEffect(() => {
        const timeouts = [
            setTimeout(() => {
                setFade(false);
            }, 0),
            setTimeout(() => {
                setFade(true);
            }, 1000),

            setTimeout(() => {
                setFade(false);
                setStep(0);
            }, 2000),
            
            setTimeout(() => {
                setNext(1);
            }, 3000),

            setTimeout(() => {
                setFade(true);
                setShrink(true);
            }, 4000),
            setTimeout(() => {
                setNext(2);
                setFade(true);
            }, 5000),
        ];

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <div className="h-screen flex items-center justify-center relative">
            <div className="relative flex flex-col items-center">
                {next === 0 && (
                    <h1 className={`${baseClass} ${fadeClass} `}>
                        Hello
                    </h1>
                )}
                {/* "My name is" */}
                {next >= 1 && (
                    <h1 className={`${baseClass} ${fadeClass} ${shrinkClass} ${moveUpClass} `}>
                        My name is
                    </h1>
                )}

                {/* Always reserve space for second h1 to prevent push */}
                <h1
                    className={`${baseClass} text-5xl font-bold  ${next === 2 ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-1000`}
                >
                    Cesar Gonzalez
                </h1>
            </div>
        </div>
    );
}


export default Header;
