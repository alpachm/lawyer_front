import type { IconType } from "react-icons";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { useTranslation } from "react-i18next";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContactItem {
    icon: IconType;
    labelKey:
        | "Contact.whatsapp"
        | "Contact.phone"
        | "Contact.email"
        | "Contact.address"
        | "Contact.hours";
    href?: string;
    external?: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CONTACT_ITEMS: ContactItem[] = [
    {
        icon: FaWhatsapp,
        labelKey: "Contact.whatsapp",
        href: "https://wa.link/3ant7x",
        external: true,
    },
    {
        icon: FiPhone,
        labelKey: "Contact.phone",
        href: "tel:+582680000000",
    },
    {
        icon: FiMail,
        labelKey: "Contact.email",
        href: "mailto:contacto@abogado.com",
    },
    {
        icon: FiMapPin,
        labelKey: "Contact.address",
    },
    {
        icon: FiClock,
        labelKey: "Contact.hours",
    },
];

const MAP_EMBED_URL =
    "https://www.google.com/maps?q=Santa%20Ana%20de%20Coro%2C%20Falc%C3%B3n%2C%20Venezuela&output=embed";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Contact = () => {
    const { t } = useTranslation();

    return (
        <section id="contact" className="scroll-mt-20 bg-primary py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4">
                {/* ---- Header Section ---- */}
                <div className="w-full flex flex-col items-center">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-accent">
                        {t("Contact.subheading")}
                    </span>
                    <h2 className="my-3 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                        {t("Contact.title")}
                    </h2>
                    <p className="max-w-2xl font-sans text-base text-slate-300">
                        {t("Contact.description")}
                    </p>
                </div>

                {/* ---- Split Content Grid (Desktop 50% / 50%) ---- */}
                <div className="mt-12 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
                    {/* ---- Left Column: Contact Information Card ---- */}
                    <div className="flex flex-col justify-center gap-6 rounded-2xl bg-white p-8 shadow-xl lg:p-10">
                        <ul className="flex flex-col gap-6">
                            {CONTACT_ITEMS.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <li key={item.labelKey} className="flex items-center gap-4">
                                        <Icon
                                            className="h-6 w-6 shrink-0 text-accent"
                                            aria-hidden="true"
                                        />
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                target={item.external ? "_blank" : undefined}
                                                rel={
                                                    item.external
                                                        ? "noopener noreferrer"
                                                        : undefined
                                                }
                                                className="font-sans text-sm text-primary transition-colors duration-200 hover:text-secondary sm:text-base"
                                            >
                                                {t(item.labelKey)}
                                            </a>
                                        ) : (
                                            <span className="font-sans text-sm text-primary sm:text-base">
                                                {t(item.labelKey)}
                                            </span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* ---- Right Column: Google Maps ---- */}
                    <div className="min-h-[350px] overflow-hidden rounded-2xl border border-slate-200 shadow-md lg:min-h-full">
                        <iframe
                            src={MAP_EMBED_URL}
                            title={t("Contact.mapTitle")}
                            className="h-full min-h-[350px] w-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
