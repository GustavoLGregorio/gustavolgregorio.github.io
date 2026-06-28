import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { backgroundBus } from "../lib/backgroundBus";
import { useTranslation } from "react-i18next";
// import NavBackground from "./NavBackground";

export default function Header() {
    const { t, i18n } = useTranslation();
    const [isToggled, setIsToggled] = useState<boolean>(true);
    const [navbarToggler, setNavbarToggler] = useState<IconDefinition>(faBars);
    const navRef = useRef(null);
    const [menuClasses, setMenuClasses] = useState<string>("hidden");
    const [windowSize, setWindowSize] = useState<[number, number]>([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        if (isToggled) {
            setMenuClasses("hidden");
            setNavbarToggler(faBars);
            backgroundBus.emit("start");
        } else {
            setMenuClasses("flex");
            setNavbarToggler(faXmark);
            backgroundBus.emit("pause");
        }
    }, [isToggled]);

    useEffect(() => {
        console.log(windowSize);
        const resizeHandler = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener("resize", resizeHandler);

        return () => window.removeEventListener("resize", resizeHandler);
    }, [windowSize]);

    const handleOnClickPageScroll = () => {
        window.scrollTo({ top: window.outerHeight });
    };

    const toggleMenu = () => {
        if (isToggled) setIsToggled(false);
        else setIsToggled(true);
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === "pt" ? "en" : "pt";
        i18n.changeLanguage(newLang);
    };

    const handleCurriculumClick = () => {
        window.open(location.href + "cv.pdf", "_blank");
    };

    const TogglableNav = () => {
        return (
            <nav>
                <button onClick={toggleMenu} className="cursor-pointer">
                    <FontAwesomeIcon icon={navbarToggler} size="2x" />
                </button>
                <ul
                    ref={navRef}
                    className={`${menuClasses} bg-background absolute left-0 mt-4 h-dvh w-full flex-col gap-2 px-4 py-4`}
                >
                    <div className="p-4">
                        <li className="capitalize">
                            <a onClick={handleOnClickPageScroll} className="cursor-pointer">
                                {t("header.about")}
                            </a>
                        </li>
                        <li className="capitalize">
                            <a onClick={handleCurriculumClick} className="cursor-pointer">
                                {t("header.resume")}
                            </a>
                        </li>
                    </div>
                    <div className="border-t-foreground flex flex-row justify-center gap-x-4 border-t-2 pt-6">
                        <li>
                            <a href="https://www.linkedin.com/in/gustavo-luiz-gregorio/" target="_blank">
                                <FontAwesomeIcon icon={faLinkedin} size="2x" />
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/GustavoLGregorio" target="_blank">
                                <FontAwesomeIcon icon={faGithub} size="2x" />
                            </a>
                        </li>
                        <li>
                            <button onClick={toggleLanguage} className="flex h-full items-center font-bold cs-link px-2">
                                {i18n.language.toUpperCase()}
                            </button>
                        </li>
                    </div>
                    {/* <NavBackground /> */}
                </ul>
            </nav>
        );
    };

    const RowNav = () => {
        return (
            <nav>
                <ul ref={navRef} className="bg-background flex w-full items-center gap-4">
                    <li className="capitalize">
                        <a onClick={handleOnClickPageScroll} className="cursor-pointer">
                            {t("header.about")}
                        </a>
                    </li>
                    <li className="capitalize">
                        <button onClick={handleCurriculumClick} className="cs-link cursor-pointer">
                            {t("header.resume")}
                        </button>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/gustavo-luiz-gregorio/" target="_blank">
                            <FontAwesomeIcon icon={faLinkedin} size="2x" />
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/GustavoLGregorio" target="_blank">
                            <FontAwesomeIcon icon={faGithub} size="2x" />
                        </a>
                    </li>
                    <li>
                        <button onClick={toggleLanguage} className="flex h-full items-center font-bold cs-link px-2 border-l border-foreground/30 pl-4 ml-2">
                            {i18n.language.toUpperCase()}
                        </button>
                    </li>
                </ul>
            </nav>
        );
    };

    return (
        <header className="bg-background cs-font-lalezar fixed z-50 flex w-full justify-center px-6 py-4 text-lg sm:text-xl border-b border-foreground/10">
            <div className="w-full max-w-6xl flex items-center justify-between">
                <a href="#" className="text-xl">
                    Gustavo L. Gregorio
                </a>

                {windowSize[0] >= 640 ? <RowNav /> : <TogglableNav />}
            </div>
        </header>
    );
}
