import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const WHATSAPP_URL = "https://wa.link/3ant7x";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const WhatsappCTA = () => {
    const { t } = useTranslation();

    return (
        <section className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
            <div className="flex flex-col items-center justify-center gap-6 rounded-3xl bg-primary p-10 text-center shadow-xl lg:p-16">
                <h2 className="font-serif text-2xl font-bold text-white lg:text-4xl">
                    {t("WhatsappCTA.title")}
                </h2>

                <p className="max-w-xl font-sans text-base text-slate-300 lg:text-lg">
                    {t("WhatsappCTA.subtitle")}
                </p>

                <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3.5 font-sans font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-emerald-600"
                >
                    <FaWhatsapp className="h-5 w-5 shrink-0" aria-hidden="true" />
                    {t("Actions.whatsappCta")}
                </a>
            </div>
        </section>
    );
};
