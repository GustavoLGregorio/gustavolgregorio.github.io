import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="cs-font-fragment-mono bg-background p-6 text-center sm:text-xl">
            {t("footer.copyright", { year: new Date().getFullYear() })}
        </footer>
    );
}
