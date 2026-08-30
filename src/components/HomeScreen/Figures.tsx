import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FigureMetric {
    value: string;
    symbol: string;
    labelKey: "Figures.casesWon" | "Figures.yearsExperience" | "Figures.clientSatisfaction";
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const METRICS: FigureMetric[] = [
    { value: "150", symbol: "+", labelKey: "Figures.casesWon" },
    { value: "10", symbol: "+", labelKey: "Figures.yearsExperience" },
    { value: "98", symbol: "%", labelKey: "Figures.clientSatisfaction" },
];

// Smooth count-up duration (milliseconds).
const COUNT_UP_DURATION_MS = 1000;

// Portion of the section that must be visible before the counter starts.
const OBSERVER_THRESHOLD = 0.2;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extracts the numeric target from a metric value string. Values are stored as
 * strings so they can later carry inline suffixes (e.g. "1.2k"); `parseFloat`
 * keeps only the leading numeric portion while the visual suffix is rendered
 * separately through `FigureMetric.symbol`.
 */
function parseNumericTarget(value: string): number {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
}

/** Eases the linear progress for a natural deceleration at the end of the count. */
function easeOutCubic(progress: number): number {
    return 1 - Math.pow(1 - progress, 3);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Figures = () => {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Start from the full static values so the numbers still render correctly
    // if IntersectionObserver (or JavaScript) is unavailable.
    const [values, setValues] = useState<number[]>(() =>
        METRICS.map((metric) => parseNumericTarget(metric.value)),
    );

    useEffect(() => {
        const section = sectionRef.current;

        // Keep the static fallback when IntersectionObserver is unsupported.
        if (!section || typeof IntersectionObserver === "undefined") {
            return;
        }

        const targets = METRICS.map((metric) => parseNumericTarget(metric.value));

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) {
                    return;
                }

                // Animate only once, then stop observing.
                observer.disconnect();

                const startTime = performance.now();

                const animate = (now: number) => {
                    const linearProgress = Math.min((now - startTime) / COUNT_UP_DURATION_MS, 1);
                    const progress = easeOutCubic(linearProgress);

                    setValues(targets.map((target) => Math.round(target * progress)));

                    if (linearProgress < 1) {
                        animationFrameRef.current = requestAnimationFrame(animate);
                    }
                };

                animationFrameRef.current = requestAnimationFrame(animate);
            },
            { threshold: OBSERVER_THRESHOLD },
        );

        observer.observe(section);

        return () => {
            observer.disconnect();

            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="bg-primary px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                    {METRICS.map((metric, index) => (
                        <div key={metric.labelKey}>
                            <div className="font-sans text-4xl font-bold lg:text-5xl">
                                <span className="text-white">{values[index]}</span>
                                <span className="text-accent">{metric.symbol}</span>
                            </div>
                            <p className="mt-2 font-sans text-sm text-white/90 lg:text-base">
                                {t(metric.labelKey)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
