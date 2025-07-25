import { useEffect, useState } from "react";

export default function Header() {
    const [step, setStep] = useState(0);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 700),
            setTimeout(() => setStep(2), 1400),
            setTimeout(() => setStep(3), 2100),
            setTimeout(() => setStep(4), 2800),
            setTimeout(() => setStep(5), 3500),
            setTimeout(() => {
                setStep(6);
                setShowContent(true);
            }, 4500),
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    const isFinal = step >= 5;

    // Header size and background
    const headerSize = step >= 6 ? "h-24" : "h-screen";
    const headerBg = step >= 6
        ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
        : "";

    // Outer wrapper positioning
    const outerPos = isFinal
        ? "top-4 -left-20 translate-x-0 translate-y-0"
        : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

    // Inner wrapper layout
    const innerLayout = isFinal
        ? "flex-row items-baseline gap-3"
        : "flex-col items-center";

    return (
        <>
            <header
                className={`
                    fixed inset-x-0 top-0 z-50
                    transition-all duration-700 ease-in-out
                    ${headerSize} ${headerBg}
                `}
            >
                {/* Outer: position + transform */}
                <div
                    className={`
                        absolute transform
                        transition-all duration-700 ease-out
                        ${outerPos}
                    `}
                >
                    {/* Inner: layout, sizing, opacity */}
                    <div
                        className={`
                            flex transition-all duration-500 ease-in-out
                            ${innerLayout}
                        `}
                    >
                        {step < 3 ? (
                            <h1 className="text-5xl font-thin text-gray-800 dark:text-gray-200">
                                Hello 👋
                            </h1>
                        ) : (
                            <>
                                <h1
                                    className={`
                                        text-gray-600 dark:text-gray-400
                                        transition-all duration-500
                                        ${isFinal ? "text-lg opacity-0" : "text-3xl opacity-100"}
                                        overflow-hidden
                                    `}
                                >
                                    My name is
                                </h1>
                                <h1
                                    className={`
                                        text-gray-800 dark:text-gray-200
                                        transition-all duration-700
                                        ${step >= 4 ? "opacity-100 text-2xl" : "opacity-0 text-5xl"}
                                    `}
                                >
                                    Cesar Gonzalez
                                </h1>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {showContent && (
                <main className="pt-24 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                    <div className="p-8 space-y-4">
                        <h2 className="text-4xl font-bold">My Projects</h2>

                        <div className="h-screen bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                            <p>Page Content</p>
                        </div>

                        <div className="h-screen bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                            <p>And here…</p>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}
