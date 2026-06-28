import { useEffect, useState, useRef } from "react";
import TypewriterText from "./TypewriterText";
import { useTranslation } from "react-i18next";

export default function Hero() {
    const { t } = useTranslation();
    const [screenHeight, setScreenHeight] = useState<number>(window.outerHeight);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resizer = () => {
            setScreenHeight(window.outerHeight);
        };
        window.addEventListener("resize", resizer);

        return () => removeEventListener("resize", resizer);
    }, []);

    // TODO: Add screenHeight dependency to the useEffect and fix the resize bug
    useEffect(() => {
        containerRef.current!.style.height = `${screenHeight}px`;
    }, [screenHeight]);

    return (
        <div className="flex flex-col justify-center gap-4 px-4 sm:text-center w-full max-w-6xl mx-auto" ref={containerRef}>
            <h1 className="cs-font-tilt-warp cs-text-gradient text-6xl sm:text-7xl md:text-8xl">Gustavo Luiz Gregorio</h1>
            <h2 className="cs-font-montserrat relative flex w-full self-center text-3xl font-semibold sm:text-4xl md:text-5xl">
                <div className="absolute top-0 z-10 w-full">
                    <TypewriterText text={t("hero.title")} typeSpeed={100} deleteSpeed={80} />
                </div>
            </h2>
        </div>
    );
}
