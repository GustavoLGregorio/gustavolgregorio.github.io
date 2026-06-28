import TechCarousel from "./TechCarousel";
import SectionTitle from "./SectionTitle";
import profile_pic from "./../assets/images/profile_pic.png";
import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();
    return (
        <section id="about" className="flex flex-col">
            <SectionTitle title={t("about.title")} />

            <div className="flex flex-col gap-8">
                <img
                    src={profile_pic}
                    alt="Foto de Gustavo Luiz Gregorio"
                    className="aspect-square w-1/2 self-center rounded-xl object-cover object-center sm:w-1/3 md:w-1/4"
                />
                <div className="cs-font-fragment-mono flex flex-col gap-4 text-base sm:text-lg">
                    <p>{t("about.text1")}</p>
                    <p>{t("about.text2")}</p>
                    <p>{t("about.text3")}</p>
                    <p>{t("about.text4")}</p>
                </div>
                <TechCarousel />
            </div>
        </section>
    );
}
