import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { FiBriefcase, FiShield } from "react-icons/fi";

import { scrollToSection } from "../../utils/scrollNavigation";

import heroImage from "../../assets/HomeScreen/hero.png";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Hero = () => {
    const { t } = useTranslation();

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
        <section id="home" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-4 lg:py-18">
            <div className="flex flex-col-reverse items-center gap-10 lg:flex-row lg:gap-16">
                {/* ---- Left Column: Content (60%) ---- */}
                <div className="flex w-full flex-col gap-6 lg:w-[60%]">
                    {/* 1. Subheading Tag */}
                    <span className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-secondary">
                        {t("Hero.subheading")}
                    </span>

                    {/* 2. Main Title */}
                    <h1 className="font-serif text-4xl font-bold leading-tight text-text sm:text-5xl lg:text-6xl">
                        {t("Hero.title")}
                    </h1>

                    {/* 3. Description Paragraph */}
                    <p className="max-w-prose text-base leading-relaxed text-secondary-text sm:text-lg">
                        {t("Hero.description")}
                    </p>

                    {/* 4. Action Buttons */}
                    <div className="flex flex-wrap items-center gap-4">
                        <a
                            href="#contact"
                            onClick={(event) => handleNavClick(event, "#contact")}
                            className="inline-flex items-center rounded-md bg-accent px-6 py-3 font-sans text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 sm:text-base"
                        >
                            {t("Hero.consultationCta")}
                        </a>
                        <a
                            href="#services"
                            onClick={(event) => handleNavClick(event, "#services")}
                            className="inline-flex items-center rounded-md border border-secondary-text px-6 py-3 font-sans text-sm font-semibold text-text transition-colors duration-200 hover:border-secondary hover:text-secondary sm:text-base"
                        >
                            {t("Hero.servicesCta")}
                        </a>
                    </div>

                    {/* 5. Trust Badges */}
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                        <div className="flex items-center gap-2">
                            <FiShield className="h-5 w-5 shrink-0 text-accent" />
                            <span className="font-sans text-sm text-text sm:text-base">
                                {t("Hero.badgeLicensed")}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiBriefcase className="h-5 w-5 shrink-0 text-accent" />
                            <span className="font-sans text-sm text-text sm:text-base">
                                {t("Hero.badgeCases")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ---- Right Column: Image (40%) ---- */}
                <div className="w-full lg:w-[40%]">
                    <img
                        src={heroImage}
                        alt={t("Hero.imageAlt")}
                        className="h-auto w-full object-cover shadow-2xl rounded-xl"
                        loading="eager"
                    />
                </div>
            </div>
        </section>
    );
};
