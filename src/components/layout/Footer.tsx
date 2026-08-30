import type { MouseEvent } from "react";
import type { IconType } from "react-icons";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import { scrollToSection } from "../../utils/scrollNavigation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FooterNavLink {
    labelKey:
        | "Footer.navHome"
        | "Footer.navAbout"
        | "Footer.navServices"
        | "Footer.navTestimonials"
        | "Footer.navContact";
    href: string;
}

interface FooterArea {
    labelKey:
        | "Footer.areaCorporate"
        | "Footer.areaCivil"
        | "Footer.areaLabor"
        | "Footer.areaCommercial"
        | "Footer.areaIntellectual"
        | "Footer.areaLitigation";
    href: string;
}

interface FooterContactItem {
    icon: IconType;
    labelKey: "Footer.addressLabel" | "Footer.emailLabel" | "Footer.phoneLabel";
    valueKey: "Footer.address" | "Footer.email" | "Footer.phone";
    href?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const NAV_LINKS: FooterNavLink[] = [
    { labelKey: "Footer.navHome", href: "#home" },
    { labelKey: "Footer.navAbout", href: "#about" },
    { labelKey: "Footer.navServices", href: "#services" },
    { labelKey: "Footer.navTestimonials", href: "#testimonials" },
    { labelKey: "Footer.navContact", href: "#contact" },
];

const AREAS: FooterArea[] = [
    { labelKey: "Footer.areaCorporate", href: "#services" },
    { labelKey: "Footer.areaCivil", href: "#services" },
    { labelKey: "Footer.areaLabor", href: "#services" },
    { labelKey: "Footer.areaCommercial", href: "#services" },
    { labelKey: "Footer.areaIntellectual", href: "#services" },
    { labelKey: "Footer.areaLitigation", href: "#services" },
];

const CONTACT_ITEMS: FooterContactItem[] = [
    {
        icon: FiMapPin,
        labelKey: "Footer.addressLabel",
        valueKey: "Footer.address",
    },
    {
        icon: FiMail,
        labelKey: "Footer.emailLabel",
        valueKey: "Footer.email",
        href: "mailto:contacto@abogado.com",
    },
    {
        icon: FiPhone,
        labelKey: "Footer.phoneLabel",
        valueKey: "Footer.phone",
        href: "tel:+582680000000",
    },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string): void => {
        // Keep native behaviour for new-tab / modified clicks.
        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        event.preventDefault();
        scrollToSection(href);
    };

    return (
        <footer className="border-t border-slate-800 bg-primary pt-20 pb-8 text-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* ---- Main Grid: 12-Column Layout ---- */}
                <div className="grid grid-cols-1 gap-12 border-b border-slate-800/80 pb-16 md:grid-cols-2 lg:grid-cols-12">
                    {/* ---- Column 1: Brand & Identity ---- */}
                    <div className="lg:col-span-4">
                        <a
                            href="#home"
                            className="inline-flex items-center gap-3"
                            onClick={(event) => handleNavClick(event, "#home")}
                        >
                            <span className="font-serif text-2xl font-bold tracking-tight text-white">
                                {t("Footer.brandName")}
                            </span>
                        </a>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
                            {t("Footer.description")}
                        </p>
                    </div>

                    {/* ---- Column 2: Navegación ---- */}
                    <nav className="lg:col-span-2" aria-label={t("Footer.navigationTitle")}>
                        <h3 className="mb-5 font-sans text-xs font-semibold uppercase tracking-wider text-secondary">
                            {t("Footer.navigationTitle")}
                        </h3>
                        <ul className="flex flex-col space-y-3 text-sm text-slate-300">
                            {NAV_LINKS.map((link) => (
                                <li key={link.labelKey}>
                                    <a
                                        href={link.href}
                                        onClick={(event) => handleNavClick(event, link.href)}
                                        className="inline-block transition-all duration-200 ease-in-out hover:translate-x-1"
                                    >
                                        {t(link.labelKey)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* ---- Column 3: Áreas de Práctica ---- */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-5 font-sans text-xs font-semibold uppercase tracking-wider text-secondary">
                            {t("Footer.areasTitle")}
                        </h3>
                        <ul className="flex flex-col space-y-3 text-sm text-slate-300">
                            {AREAS.map((area) => (
                                <li key={area.labelKey}>
                                    <a
                                        href={area.href}
                                        onClick={(event) => handleNavClick(event, area.href)}
                                        className="inline-block transition-all duration-200 ease-in-out hover:translate-x-1"
                                    >
                                        {t(area.labelKey)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---- Column 4: Contacto & Atención ---- */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-5 font-sans text-xs font-semibold uppercase tracking-wider text-secondary">
                            {t("Footer.contactTitle")}
                        </h3>
                        <ul className="space-y-4 text-sm text-slate-300">
                            {CONTACT_ITEMS.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <li key={item.labelKey} className="flex items-start gap-3">
                                        <Icon
                                            className="mt-0.5 h-4 w-4 shrink-0 text-slate-500"
                                            aria-hidden="true"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase tracking-wider text-slate-500">
                                                {t(item.labelKey)}
                                            </span>
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="transition-all duration-200 ease-in-out hover:translate-x-1"
                                                >
                                                    {t(item.valueKey)}
                                                </a>
                                            ) : (
                                                <span>{t(item.valueKey)}</span>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* ---- Bottom Copyright Bar ---- */}
                <div className="flex flex-col items-center justify-center gap-4 pt-8 text-xs text-slate-500 md:flex-row">
                    <p>{t("Footer.rights", { year: currentYear })}</p>
                    <div className="flex items-center gap-2">
                        <a href="#" className="transition-colors duration-200 hover:text-secondary">
                            {t("Footer.terms")}
                        </a>
                        <span className="text-slate-600" aria-hidden="true">
                            ·
                        </span>
                        <a href="#" className="transition-colors duration-200 hover:text-secondary">
                            {t("Footer.privacy")}
                        </a>
                    </div>
                </div>

                {/* ---- Creation Credit ---- */}
                <p className="flex items-center justify-center gap-1 pt-4 text-center font-sans text-xs tracking-wide text-slate-500">
                    <span>{t("Footer.creditPrefix")}</span>
                    <a
                        href="https://vizostudio.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-baseline gap-1 transition-opacity duration-200 hover:opacity-80"
                    >
                        <span className="font-vizo text-md font-extrabold text-white">
                            {t("Footer.creditBrandVizo")}
                        </span>
                        <span className="font-vizo text-md font-extrabold text-vizo">
                            {t("Footer.creditBrandStudio")}
                        </span>
                    </a>
                </p>
            </div>
        </footer>
    );
};
