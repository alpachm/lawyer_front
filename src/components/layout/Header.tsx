import { useState, useEffect, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { FiMenu, FiX } from "react-icons/fi";

import { scrollToSection } from "../../utils/scrollNavigation";

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
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

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

    // Track vertical scroll to toggle the header elevation shadow
    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = (): void => setIsMenuOpen((prev) => !prev);
    const closeMenu = (): void => setIsMenuOpen(false);

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
        closeMenu();

        // Clear the mobile menu body scroll lock immediately so the smooth
        // scroll is never blocked by the still-open drawer state.
        document.body.style.overflow = "";

        scrollToSection(href);
    };

    return (
        <header
            id="site-header"
            className={`fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md transition-all duration-300 ease-in-out ${
                isScrolled ? "shadow-md" : "shadow-none"
            }`}
        >
            <nav
                className={`mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8 lg:px-16 transition-all duration-300 ease-in-out ${
                    isScrolled ? "py-2.5" : "py-4"
                }`}
                role="navigation"
            >
                {/* ---- Left: Brand ---- */}
                <a
                    href="#home"
                    className="flex flex-col leading-tight"
                    onClick={(event) => handleNavClick(event, "#home")}
                >
                    <span className="font-serif text-xl font-black tracking-wide text-primary md:text-3xl">
                        {t("Header.brandName")}
                    </span>
                    <span className="font-sans text-xs uppercase tracking-[1px] text-accent">
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
                                    onClick={(event) => handleNavClick(event, entry.href)}
                                    className="rounded-md bg-accent px-5 py-2 text-xl font-light text-white transition-opacity duration-200 hover:opacity-90"
                                >
                                    {t(entry.labelKey)}
                                </a>
                            </li>
                        ) : (
                            <li key={entry.labelKey}>
                                <a
                                    href={entry.href}
                                    onClick={(event) => handleNavClick(event, entry.href)}
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
                className={`fixed left-0 right-0 top-16 z-40 h-[calc(100vh-64px)] w-full bg-white flex flex-col p-6 gap-6 md:hidden transition-transform duration-300 ease-in-out ${
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
                                    onClick={(event) => handleNavClick(event, entry.href)}
                                    className="rounded-md block bg-accent px-6 py-3 text-center text-lg font-semibold text-white transition-opacity duration-200 hover:opacity-90"
                                >
                                    {t(entry.labelKey)}
                                </a>
                            </li>
                        ) : (
                            <li key={entry.labelKey}>
                                <a
                                    href={entry.href}
                                    onClick={(event) => handleNavClick(event, entry.href)}
                                    className="block py-3 text-3xl font-light text-text transition-colors duration-200 hover:text-secondary"
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
