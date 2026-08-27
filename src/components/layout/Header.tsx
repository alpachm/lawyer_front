import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiMenu, FiX } from "react-icons/fi";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavItem {
    labelKey:
        "Header.navHome" | "Header.navAbout" | "Header.navServices" | "Header.navTestimonials";
    href: string;
}

interface CtaItem {
    labelKey: "Actions.contact";
    href: string;
    isCTA: true;
}

type NavEntry = NavItem | CtaItem;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const NAV_ENTRIES: NavEntry[] = [
    { labelKey: "Header.navHome", href: "#home" },
    { labelKey: "Header.navAbout", href: "#about" },
    { labelKey: "Header.navServices", href: "#services" },
    { labelKey: "Header.navTestimonials", href: "#testimonials" },
    { labelKey: "Actions.contact", href: "#contact", isCTA: true },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Header = () => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const toggleMenu = (): void => setIsMenuOpen((prev) => !prev);
    const closeMenu = (): void => setIsMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 bg-transparent backdrop-blur-sm">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8 lg:px-16"
                role="navigation"
            >
                {/* ---- Left: Brand ---- */}
                <a href="#home" className="flex flex-col leading-tight">
                    <span className="font-serif text-xl font-bold tracking-wide text-text md:text-2xl">
                        {t("Header.brandName")}
                    </span>
                    <span className="font-sans text-xs uppercase tracking-[0.1em] text-secondary-text md:text-sm">
                        {t("Header.brandTitle")}
                    </span>
                </a>

                {/* ---- Right: Desktop nav ---- */}
                <ul className="hidden items-center gap-6 md:flex">
                    {NAV_ENTRIES.map((entry) =>
                        "isCTA" in entry ? (
                            <li key={entry.labelKey}>
                                <a
                                    href={entry.href}
                                    className=" bg-accent px-5 py-2 text-xl font-light text-white transition-opacity duration-200 hover:opacity-90"
                                >
                                    {t(entry.labelKey)}
                                </a>
                            </li>
                        ) : (
                            <li key={entry.labelKey}>
                                <a
                                    href={entry.href}
                                    className="text-xl font-light text-text transition-colors duration-200 hover:text-secondary"
                                >
                                    {t(entry.labelKey)}
                                </a>
                            </li>
                        ),
                    )}
                </ul>

                {/* ---- Mobile: Hamburger ---- */}
                <button
                    type="button"
                    className="rounded-md p-2 text-text transition-colors duration-200 hover:text-secondary md:hidden"
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-label={
                        isMenuOpen
                            ? t("Header.closeMenuAriaLabel")
                            : t("Header.mobileMenuAriaLabel")
                    }
                >
                    {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                </button>
            </nav>

            {/* ---- Mobile: Slide-in panel ---- */}
            <div
                className={`fixed left-0 right-0 top-16 z-40 h-[calc(100vh-64px)] w-full bg-primary flex flex-col p-6 gap-6 md:hidden transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                aria-hidden={!isMenuOpen}
            >
                <ul className="flex flex-col justify-between text-center h-full gap-6">
                    {NAV_ENTRIES.map((entry) =>
                        "isCTA" in entry ? (
                            <li key={entry.labelKey}>
                                <a
                                    href={entry.href}
                                    className="block bg-accent px-6 py-3 text-center text-lg font-semibold text-white transition-opacity duration-200 hover:opacity-90"
                                    onClick={closeMenu}
                                >
                                    {t(entry.labelKey)}
                                </a>
                            </li>
                        ) : (
                            <li key={entry.labelKey}>
                                <a
                                    href={entry.href}
                                    className="block py-3 text-3xl font-light text-text transition-colors duration-200 hover:text-secondary"
                                    onClick={closeMenu}
                                >
                                    {t(entry.labelKey)}
                                </a>
                            </li>
                        ),
                    )}
                </ul>
            </div>
        </header>
    );
};
