import Project from "./Project";
import type { ProjectProps } from "./Project";
import SectionTitle from "./SectionTitle";
import { faHtml5, faCss3, faJs, faReact, faNodeJs, faRust, faPython } from "@fortawesome/free-brands-svg-icons";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import imgJapanShowcase from "./../assets/images/japan_showcase.png";
import imgLixadoraGregorio from "./../assets/images/lixadora_gregorio.png";
import { useTranslation } from "react-i18next";
import { AutoTheme } from "auto-theme-js";
import { die } from "die-statement";
import { useState } from "react";

export default function Projects() {
    const { t, i18n } = useTranslation();
    const [isDead, setIsDead] = useState(false);

    const isPT = i18n.language === "pt";

    const projects: ProjectProps[] = [
        {
            id: "brio-js",
            title: "BrioJS",
            status: "development",
            description: isPT ? "Engine para criação de jogos 2D construída do zero" : "2D Game Engine built from scratch",
            longDescription: (
                <>
                    <p>
                        {isPT ? "BrioJS é meu projeto open source favorito. Não criei esta engine com a pretensão de substituir ferramentas consolidadas, mas sim como um laboratório profundo de estudos." : "BrioJS is my favorite open-source project. I didn't create this engine to replace established tools, but rather as a deep study laboratory."}
                    </p>
                    <p>
                        {isPT ? "Através do BrioJS, eu apliquei na prática conceitos complexos como OOP, Event Loop, Injeção de Dependências (DI), Inversão de Controle (IoC), e padrões de arquitetura como Registry, Null Object e State Machine." : "Through BrioJS, I practically applied complex concepts such as OOP, Event Loop, Dependency Injection (DI), Inversion of Control (IoC), and architectural patterns like Registry, Null Object, and State Machine."}
                    </p>
                </>
            ),
            link: "https://github.com/GustavoLGregorio/brio-js",
            icons: [faHtml5, faCss3, faJs],
        },
        {
            id: "glyphia",
            title: "Glyphia",
            status: "production",
            description: isPT ? "Plataforma SaaS em produção" : "SaaS Platform in production",
            longDescription: (
                <>
                    <p>
                        {isPT ? "O Glyphia é uma aplicação web completa que já se encontra em produção. Apesar de estar online, continua em constante desenvolvimento." : "Glyphia is a complete web application already in production. Although it's live, it remains in continuous development."}
                    </p>
                    <p>
                        {isPT ? "Ele reflete as minhas habilidades com desenvolvimento Fullstack utilizando ferramentas modernas e padrões arquiteturais escaláveis." : "It reflects my Fullstack development skills using modern tools and scalable architectural patterns."}
                    </p>
                </>
            ),
            link: "https://glyphia.site",
            icons: [faReact, faNodeJs, faJs],
        },
        {
            id: "nexus-media-hub",
            title: "NexusMediaHub",
            status: "closed_source",
            description: isPT ? "Plataforma fechada com intensa automação e IA" : "Closed platform with intense automation and AI",
            longDescription: (
                <>
                    <p>
                        {isPT ? "Este projeto toma uma grande parte do meu tempo. É um Media Hub complexo onde utilizo muita Inteligência Artificial, tanto no auxílio ao desenvolvimento quanto em pipelines baseadas em IA para produção e consumo de mídia." : "This project takes up a large part of my time. It's a complex Media Hub where I heavily use Artificial Intelligence, both in assisting development and in AI-based pipelines for media production and consumption."}
                    </p>
                    <p>
                        {isPT ? "Por ser Closed Source e estar numa fase de desenvolvimento onde a estabilidade total ainda não foi atingida, mantenho o código em repositório privado no GitHub. Ainda assim, é o maior exemplo das minhas habilidades de automação complexa." : "As it is Closed Source and in a development phase where full stability hasn't yet been reached, I keep the code in a private GitHub repository. However, it is the biggest example of my complex automation skills."}
                    </p>
                </>
            ),
            icons: [faReact, faPython, faRust, faRobot],
        },
        {
            id: "agent-slot",
            title: "Agent-Slot",
            status: "development",
            description: isPT ? "Sistema de metaprogramação agêntica" : "Agentic metaprogramming system",
            longDescription: (
                <>
                    <p>
                        {isPT ? "Ferramenta para geração de manifestos de IA que alimentam sistemas RAG (Retrieval-Augmented Generation) para o contexto de projetos." : "Tool for generating AI manifests that feed RAG (Retrieval-Augmented Generation) systems for project contexts."}
                    </p>
                    <p>
                        {isPT ? "Utilizo esta ferramenta em praticamente todos os meus projetos (gerando as pastas '-slot'), inclusive em ambiente profissional, auxiliando e acelerando consideravelmente meu fluxo de 'vibecoding'." : "I use this tool in practically all my projects (generating the '-slot' folders), including in professional environments, assisting and considerably accelerating my 'vibecoding' flow."}
                    </p>
                </>
            ),
            link: "https://github.com/GustavoLGregorio/agent-slot",
            icons: [faPython, faRobot],
        },
        {
            id: "entropy-particles",
            title: "entropy-particles",
            status: "npm_package",
            description: isPT ? "Biblioteca de partículas configurável" : "Configurable particles library",
            longDescription: (
                <>
                    <p>
                        {isPT ? "Uma engine de criação e renderização de partículas em canvas, disponibilizada como pacote NPM." : "A canvas particle creation and rendering engine, available as an NPM package."}
                    </p>
                    <p>
                        {isPT ? "É a responsável pelo background animado deste portfólio. Expõe uma API robusta para integração interativa no ecossistema JavaScript." : "It is responsible for the animated background of this portfolio. It exposes a robust API for interactive integration in the JavaScript ecosystem."}
                    </p>
                </>
            ),
            link: "https://www.npmjs.com/package/entropy-particles",
            icons: [faJs],
            customActions: (
                <button
                    onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const particles = (window as any).__particlesInstance;
                        if (particles) {
                            particles.config.particles.velocity = 5;
                            particles.config.particles.size = 5;
                            particles.config.particles.spreadFactor = 0;
                            particles.reinitializeParticles();
                            setTimeout(() => {
                                particles.config.particles.velocity = 0;
                                particles.config.particles.size = 1;
                                particles.config.particles.spreadFactor = 2;
                                particles.reinitializeParticles();
                            }, 5000);
                        }
                    }}
                    className="px-6 py-3 border-2 border-[#d78fee] text-[#d78fee] font-bold rounded-lg hover:bg-[#d78fee]/10 transition-colors cs-font-cascadia-code uppercase"
                >
                    {isPT ? "Acelerar Partículas (5s)" : "Accelerate Particles (5s)"}
                </button>
            )
        },
        {
            id: "auto-theme-js",
            title: "auto-theme-js",
            status: "npm_package",
            description: isPT ? "Geração dinâmica de temas baseados em contraste" : "Dynamic generation of contrast-based themes",
            longDescription: (
                <>
                    <p>
                        {isPT ? "Uma biblioteca utilitária em NPM projetada para calcular e gerar paletas de cores harmônicas e acessíveis em tempo de execução." : "A utility NPM library designed to calculate and generate harmonious and accessible color palettes at runtime."}
                    </p>
                    <p>
                        {isPT ? "Permite que aplicações web ofereçam uma experiência visual vibrante sem sacrificar legibilidade." : "Allows web applications to offer a vibrant visual experience without sacrificing readability."}
                    </p>
                </>
            ),
            link: "https://www.npmjs.com/package/auto-theme-js",
            icons: [faJs],
            customActions: (
                <button
                    onClick={() => {
                        const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
                        // Use AutoTheme library to generate harmonious themes
                        // Using 'hex' explicitly. We assume the output will be typed as ColorHex per lib
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const at = new AutoTheme(randomColor as any, "hex", "hex");

                        const root = document.documentElement;

                        // We map background to a dark primary shade and foreground to a light shade to ensure good contrast, acting like a true Theme Generator logic
                        // using standard Tailwind shade values which AutoTheme maps
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const backgroundDark = (at.primary as any)["900"] || "#0d0e0e";
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const foregroundLight = (at.primary as any)["100"] || "#ffffff";
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const linkHighlight = (at.accent as any)["400"] || "#d78fee";

                        root.style.setProperty("--color-background", backgroundDark);
                        root.style.setProperty("--color-foreground", foregroundLight);

                        // Set the link highlight color via a style injection (a simple way to show accent)
                        let styleEl = document.getElementById("auto-theme-injected");
                        if (!styleEl) {
                            styleEl = document.createElement("style");
                            styleEl.id = "auto-theme-injected";
                            document.head.appendChild(styleEl);
                        }
                        styleEl.textContent = `
                            .cs-link:hover, a:hover:not(:has(article)) {
                                color: ${linkHighlight} !important;
                            }
                            ::selection {
                                background-color: ${linkHighlight};
                                color: ${backgroundDark};
                            }
                        `;
                    }}
                    className="px-6 py-3 border-2 border-foreground text-foreground font-bold rounded-lg hover:bg-foreground/10 transition-colors cs-font-cascadia-code uppercase"
                >
                    {isPT ? "Gerar Tema Aleatório" : "Generate Random Theme"}
                </button>
            )
        },
        {
            id: "die-statement",
            title: "die-statement",
            status: "npm_package",
            description: isPT ? "Utilitário divertido (Meme-package)" : "Fun utility (Meme-package)",
            longDescription: (
                <>
                    <p>
                        {isPT ? "Um pacote criado por pura diversão que simula o famoso 'die();' ou encerramento abrupto em sistemas JavaScript." : "A package created out of pure fun that simulates the famous 'die();' or abrupt termination in JavaScript systems."}
                    </p>
                </>
            ),
            link: "https://www.npmjs.com/package/die-statement",
            icons: [faJs],
            customActions: (
                <button
                    onClick={() => {
                        if (!isDead) {
                            setIsDead(true);
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const particles = (window as any).__particlesInstance;
                            if (particles) particles.pause();

                            try {
                                die("You called die()! Animations stopped.");
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            } catch (e: any) {
                                console.log(e.message);
                            }
                        } else {
                            setIsDead(false);
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const particles = (window as any).__particlesInstance;
                            if (particles) particles.start();
                        }
                    }}
                    className={`px-6 py-3 border-2 font-bold rounded-lg transition-colors cs-font-cascadia-code uppercase ${isDead ? 'border-green-500 text-green-500 hover:bg-green-500/10' : 'border-red-500 text-red-500 hover:bg-red-500/10'}`}
                >
                    {isDead ? (isPT ? "Ressuscitar (Retomar Animações)" : "Resurrect (Resume Animations)") : "Executar die();"}
                </button>
            )
        },
        {
            id: "japan-showcase",
            title: "Japão Showcase",
            imageSource: imgJapanShowcase,
            status: "development",
            description: isPT ? "Amostra cultural sobre o Japão" : "Cultural showcase about Japan",
            link: "https://gustavo-projeto-japao.vercel.app/",
            icons: [faHtml5, faCss3, faJs],
        },
        {
            id: "lixadora-gregorio",
            title: "Lixadora Gregorio",
            imageSource: imgLixadoraGregorio,
            status: "production",
            description: isPT ? "Site de uma empresa de lixamento de pisos" : "Floor sanding company website",
            link: "https://lixadora-gregorio.vercel.app/",
            icons: [faHtml5, faCss3, faJs],
        }
    ];

    return (
        <section>
            <SectionTitle title={t("projects.title")} />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {projects.map((project) => (
                    <Project
                        key={project.id}
                        {...project}
                    />
                ))}
            </div>
        </section>
    );
}
