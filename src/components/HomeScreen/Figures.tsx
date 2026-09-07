import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TitleKey =
    | "Figures.item1.titlePrefix"
    | "Figures.item1.titleHighlight"
    | "Figures.item2.titleHighlight"
    | "Figures.item3.titlePrefix"
    | "Figures.item3.titleHighlight"
    | "Figures.item3.titleSuffix";

type SubtitleKey =
    | "Figures.item1.subtitle"
    | "Figures.item2.subtitle"
    | "Figures.item3.subtitle";

interface FigureItem {
    id: "item1" | "item2" | "item3";
    prefixKey: TitleKey | null;
    highlightKey: TitleKey;
    suffixKey: TitleKey | null;
    subtitleKey: SubtitleKey;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FIGURES: FigureItem[] = [
    {
        id: "item1",
        prefixKey: "Figures.item1.titlePrefix",
        highlightKey: "Figures.item1.titleHighlight",
        suffixKey: null,
        subtitleKey: "Figures.item1.subtitle",
    },
    {
        id: "item2",
        prefixKey: null,
        highlightKey: "Figures.item2.titleHighlight",
        suffixKey: null,
        subtitleKey: "Figures.item2.subtitle",
    },
    {
        id: "item3",
        prefixKey: "Figures.item3.titlePrefix",
        highlightKey: "Figures.item3.titleHighlight",
        suffixKey: "Figures.item3.titleSuffix",
        subtitleKey: "Figures.item3.subtitle",
    },
];

// Portion of the section that must be visible before the reveal sequence starts.
const OBSERVER_THRESHOLD = 0.2;

// Staggered transition delays for the reveal sequence. The literal values are
// kept here so Tailwind can detect and generate them at build time.
// Order: item1 -> item2 -> item3 (cascading bottom-to-top entry).
const FIGURE_DELAY_CLASSES: readonly string[] = [
    "delay-0",
    "delay-150",
    "delay-300",
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Figures = () => {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        // Keep the figures visible when IntersectionObserver (or JS) is
        // unavailable so the reveal animation never hides them permanently.
        if (!section || typeof IntersectionObserver === "undefined") {
            setIsInView(true);
            return;
        }

        // Reveal the figures once the section enters the viewport. The observer
        // is unobserved immediately so the cards stay visible after scrolling
        // past instead of resetting on every exit.
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.unobserve(entry.target);
                    }
                }
            },
            { threshold: OBSERVER_THRESHOLD },
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section ref={sectionRef} className="bg-primary px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                    {FIGURES.map((figure, index) => {
                        // Cards slide up in sequence with a staggered delay that
                        // cascades bottom-to-top. The delay is applied only once
                        // the section is in view so the initial hidden state is
                        // not unnecessarily deferred.
                        const figureAnimationClasses = `transition-all duration-700 ease-out ${
                            isInView
                                ? `${FIGURE_DELAY_CLASSES[index]} translate-y-0 opacity-100`
                                : "delay-0 translate-y-8 opacity-0"
                        }`;

                        return (
                            <div key={figure.id} className={figureAnimationClasses}>
                                <div className="font-sans text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl">
                                    {figure.prefixKey && t(figure.prefixKey)}
                                    <span className="text-accent">{t(figure.highlightKey)}</span>
                                    {figure.suffixKey && t(figure.suffixKey)}
                                </div>
                                <p className="mt-2 font-sans text-sm text-white/90 lg:text-base">
                                    {t(figure.subtitleKey)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
