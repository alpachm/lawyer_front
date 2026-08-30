import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const WHATSAPP_URL = "https://wa.me/584120000000";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const FloatingButtons = () => {
    const { t } = useTranslation();

    return (
        <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("FloatingButtons.whatsappAriaLabel")}
            className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center rounded-full bg-emerald-500 p-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-emerald-600 hover:shadow-xl"
        >
            <FaWhatsapp className="h-8 w-8 shrink-0" aria-hidden="true" />
        </a>
    );
};
