import { useEffect, useState } from "react";
import CursorTrail from './CursorTrail';


function Header() {
    const [fade, setFade] = useState(false);
    const [step, setStep] = useState(0);
    const [moveText, setMoveText] = useState(false);


    const fadeClass = fade
        ? "opacity-100 translate-x-0"
        : "opacity-0 -translate-x-[40px]";

    const baseClass =
        "absolute transition-all duration-1000 text-6xl font-bold";


    useEffect(() => {
        const timeouts = [
            // STEP 0
            setTimeout(() => {
                setStep(0);
                setFade(true);
            }, 700),

            setTimeout(() => {
                setFade(false);
            }, 2000),

            // STEP 1
            setTimeout(() => {
                setStep(1);
            }, 2800),

            setTimeout(() => {
                setFade(true);
            }, 3500),

            setTimeout(() => {
                setFade(false);
            }, 4800),

            // STEP 2
            setTimeout(() => {
                setStep(2);
            }, 5600),

            setTimeout(() => {
                setFade(true);
            }, 6300),

            setTimeout(() => {
                setFade(false);
            }, 7600),

            // STEP 3 (final)
            setTimeout(() => {
                setStep(3);
            }, 8400),

            setTimeout(() => {
                setFade(true);
            }, 9100),
        ];

        return () => timeouts.forEach(clearTimeout);
    }, []);




    return (<>
        <div className=" h-screen flex items-center justify-center overflow-hidden">
            {step === 0 && (
                <h1 className={`${baseClass} ${fadeClass}`}>Hello! 👋</h1>
            )}
            {step === 1 && (
                <h1 className={`${fadeClass} ${baseClass}`}>My name is Cesar Gonzalez! 🤓</h1>
            )}
            {step === 2 && (
                <h1 className={`${baseClass} ${fadeClass}`}>Greetings! 🤓</h1>
            )}
            {step === 3 && (<>
                <div className={`${baseClass} ${fadeClass} flex flex-col items-center`}>
                    <h1 className="text-6xl font-bold">Welcome! 🙂‍↕️</h1>
                    <p className={`${fadeClass} transition-all duration-7000 mt-4 text-lg text-gray-600`}>Let’s begin.</p>
                </div>
                </>
            )}
        </div>
        </>
    );
}
export default Header;