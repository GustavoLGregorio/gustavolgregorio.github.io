import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import React, { useState } from "react";
import { clsx } from "clsx";

export type ProjectStatus = "production" | "development" | "closed_source" | "npm_package";

export type ProjectProps = {
    id: string | number;
    title: string;
    imageSource?: string;
    imageAlt?: string;
    description: string;
    longDescription?: React.ReactNode;
    link?: string;
    icons: IconProp[];
    status: ProjectStatus;
    customActions?: React.ReactNode;
};

export default function Project(props: ProjectProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const getStatusText = (status: ProjectStatus) => t(`projects.status.${status}`);

    const getStatusColor = (status: ProjectStatus) => {
        switch (status) {
            case "production":
                return "bg-green-500/20 text-green-400 border-green-500/30";
            case "development":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "npm_package":
                return "bg-purple-500/20 text-purple-400 border-purple-500/30";
            case "closed_source":
                return "bg-red-500/20 text-red-400 border-red-500/30";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    return (
        <>
            <motion.div
                layoutId={`project-${props.id}`}
                onClick={() => setIsOpen(true)}
                className="cs-anim-glow cs-anim-neon cursor-pointer rounded-xl after:rounded-xl group"
            >
                <article className="cs-transition relative flex flex-col-reverse h-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent z-10 rounded-xl" />

                    <div className="absolute bottom-0 z-20 flex w-full flex-col gap-2 p-6 transition-transform group-hover:-translate-y-2">
                        <span className={clsx("w-fit px-2 py-1 text-xs font-bold uppercase rounded-md border backdrop-blur-md", getStatusColor(props.status))}>
                            {getStatusText(props.status)}
                        </span>

                        <h3 className="cs-font-tilt-warp text-2xl sm:text-3xl text-foreground">{props.title}</h3>
                        <p className="cs-font-cascadia-code text-sm text-foreground/80 line-clamp-2">
                            {props.description}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                            <ul className="flex gap-3 text-foreground/60">
                                {props.icons?.map((icon, index) => (
                                    <li key={index}>
                                        <FontAwesomeIcon icon={icon} />
                                    </li>
                                ))}
                            </ul>

                            <span className="text-sm font-bold text-[#d78fee] cs-font-cascadia-code opacity-0 group-hover:opacity-100 transition-opacity">
                                {t("projects.view_more")} &rarr;
                            </span>
                        </div>
                    </div>

                    {props.imageSource ? (
                        <img
                            className="aspect-[4/3] w-full rounded-xl object-cover object-center"
                            src={props.imageSource}
                            alt={props.imageAlt}
                        />
                    ) : (
                        <div className="aspect-[4/3] w-full rounded-xl bg-background border border-foreground/10 flex items-center justify-center">
                            <h3 className="cs-font-tilt-warp text-4xl opacity-30">{props.title}</h3>
                        </div>
                    )}
                </article>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        />

                        <motion.div
                            layoutId={`project-${props.id}`}
                            className="relative w-full max-w-4xl bg-background rounded-2xl overflow-hidden shadow-2xl border border-foreground/10 flex flex-col max-h-[90vh]"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 z-50 p-2 bg-background/50 hover:bg-background rounded-full transition-colors backdrop-blur-md"
                            >
                                <X className="w-6 h-6 text-foreground" />
                            </button>

                            <div className="relative w-full aspect-[21/9] sm:aspect-[16/6] bg-foreground/5 shrink-0">
                                {props.imageSource && (
                                    <img
                                        className="w-full h-full object-cover"
                                        src={props.imageSource}
                                        alt={props.imageAlt}
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                                <div className="absolute bottom-0 p-6 sm:p-10 w-full flex flex-col gap-4">
                                    <span className={clsx("w-fit px-3 py-1 text-sm font-bold uppercase rounded-md border", getStatusColor(props.status))}>
                                        {getStatusText(props.status)}
                                    </span>
                                    <h2 className="cs-font-tilt-warp text-4xl sm:text-5xl">{props.title}</h2>
                                </div>
                            </div>

                            <div className="p-6 sm:p-10 overflow-y-auto cs-font-fragment-mono text-base sm:text-lg flex flex-col gap-6">
                                <div className="flex gap-4 text-foreground/60 text-2xl">
                                    {props.icons?.map((icon, index) => (
                                        <FontAwesomeIcon key={index} icon={icon} />
                                    ))}
                                </div>

                                <p className="text-xl font-semibold cs-font-cascadia-code text-[#d78fee]">
                                    {props.description}
                                </p>

                                <div className="text-foreground/80 leading-relaxed space-y-4">
                                    {props.longDescription}
                                </div>

                                <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-foreground/10">
                                    {props.link && (
                                        <a
                                            href={props.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 bg-foreground text-background font-bold rounded-lg hover:bg-[#d78fee] transition-colors cs-font-cascadia-code uppercase"
                                        >
                                            Link / Repositório
                                        </a>
                                    )}
                                    {props.customActions}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
