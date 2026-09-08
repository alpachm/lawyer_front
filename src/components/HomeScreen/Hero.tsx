import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { FiBriefcase, FiShield } from "react-icons/fi";

import { scrollToSection } from "../../utils/scrollNavigation";

import bgHeroImage from "../../assets/HomeScreen/bg-hero.png";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const WHATSAPP_URL = "https://wa.link/3ant7x";

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
        <section
            id="home"
            className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col justify-center overflow-x-hidden scroll-mt-20 py-12 lg:py-20"
        >
            {/* ---- Mirrored full-width background image + readability overlay ---- */}
            <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src={bgHeroImage}
                    alt=""
                    className="h-full w-full scale-x-[-1] object-cover object-[center_0%]"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-primary/75" />
            </div>

            {/* ---- Content (left-aligned, constrained to a centered container) ---- */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
                <div className="flex w-full flex-col gap-6 lg:w-[60%]">
                    {/* 1. Subheading Tag */}
                    <span className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-gold">
                        {t("Hero.subheading")}
                    </span>

                    {/* 2. Main Title */}
                    <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                        {t("Hero.title")}
                    </h1>

                    {/* 3. Description Paragraph */}
                    <p className="max-w-prose text-base leading-relaxed text-slate-200 sm:text-lg">
                        {t("Hero.description")}
                    </p>

                    {/* 4. Action Buttons */}
                    <div className="flex flex-wrap items-center gap-4">
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-md bg-accent px-6 py-3 font-sans text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 sm:text-base"
                        >
                            {t("Hero.consultationCta")}
                        </a>
                        <a
                            href="#services"
                            onClick={(event) => handleNavClick(event, "#services")}
                            className="inline-flex items-center rounded-md border border-white/60 px-6 py-3 font-sans text-sm font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10 sm:text-base"
                        >
                            {t("Hero.servicesCta")}
                        </a>
                    </div>

                    {/* 5. Trust Badges */}
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                        <div className="flex items-center gap-2">
                            <FiShield className="h-5 w-5 shrink-0 text-gold" />
                            <span className="font-sans text-sm text-white sm:text-base">
                                {t("Hero.badgeLicensed")}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiBriefcase className="h-5 w-5 shrink-0 text-gold" />
                            <span className="font-sans text-sm text-white sm:text-base">
                                {t("Hero.badgeCases")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
