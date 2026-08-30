import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FiCheckCircle, FiCompass, FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MethodologyStep {
    number: string;
    titleKey:
        "Methodology.stepOneTitle" | "Methodology.stepTwoTitle" | "Methodology.stepThreeTitle";
    textKey: "Methodology.stepOneText" | "Methodology.stepTwoText" | "Methodology.stepThreeText";
    connectorIcon?: IconType;
    endIcon?: IconType;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STEPS: MethodologyStep[] = [
    {
        number: "1",
        titleKey: "Methodology.stepOneTitle",
        textKey: "Methodology.stepOneText",
        connectorIcon: FiSearch,
    },
    {
        number: "2",
        titleKey: "Methodology.stepTwoTitle",
        textKey: "Methodology.stepTwoText",
        connectorIcon: FiCompass,
    },
    {
        number: "3",
        titleKey: "Methodology.stepThreeTitle",
        textKey: "Methodology.stepThreeText",
        endIcon: FiCheckCircle,
    },
];

// Portion of the section that must be visible before the reveal sequence starts.
const OBSERVER_THRESHOLD = 0.2;

// Staggered transition delays for the reveal sequence. The literal values are
// kept here so Tailwind can detect and generate them at build time.
// Order: Step 1 -> Line 1 -> Step 2 -> Line 2 -> Step 3.
const STEP_DELAY_CLASSES: readonly string[] = [
    "delay-0",
    "delay-700",
    "delay-1400",
];

const LINE_DELAY_CLASSES: readonly string[] = [
    "delay-300",
    "delay-1000",
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Methodology = () => {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        // Keep the section content visible when IntersectionObserver (or JS) is
        // unavailable so the reveal animation never hides it permanently.
        if (!section || typeof IntersectionObserver === "undefined") {
            setIsInView(true);
            return;
        }

        // Toggle on enter and reset on exit so the sequence re-triggers every
        // time the methodology section scrolls back into view.
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    setIsInView(entry.isIntersecting);
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
        <section ref={sectionRef} className="bg-primary py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4">
                {/* ---- Header Section ---- */}
                <div className="flex w-full flex-col items-center text-center">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-accent">
                        {t("Methodology.subheading")}
                    </span>
                    <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                        {t("Methodology.title")}
                    </h2>
                </div>

                {/* ---- Steps Timeline Grid ---- */}
                <div className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {STEPS.map((step, index) => {
                        const ConnectorIcon = step.connectorIcon;
                        const EndIcon = step.endIcon;

                        // Steps fade/slide up in sequence; the connecting lines
                        // expand afterwards to build the staggered reveal. The
                        // staggered delay is applied only while the section is in
                        // view so that, on exit, every element resets instantly
                        // (no delay) before re-triggering cleanly on re-entry.
                        const stepAnimationClasses = `transition-all duration-500 ${
                            isInView
                                ? `${STEP_DELAY_CLASSES[index]} opacity-100 translate-y-0`
                                : "delay-0 opacity-0 translate-y-4"
                        }`;

                        return (
                            <article key={step.number} className="relative">
                                {/* Top Indicator Row */}
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-primary ${stepAnimationClasses}`}
                                    >
                                        {step.number}
                                    </div>

                                    {ConnectorIcon ? (
                                        <div className="hidden flex-1 items-center md:flex">
                                            <span
                                                className={`h-px flex-1 bg-accent/40 origin-left transition-transform duration-500 ease-out ${
                                                    isInView
                                                        ? `${LINE_DELAY_CLASSES[index]} scale-x-100`
                                                        : "delay-0 scale-x-0"
                                                }`}
                                                aria-hidden="true"
                                            />
                                            <ConnectorIcon
                                                className={`ml-2 h-5 w-5 shrink-0 text-accent transition-opacity duration-500 ease-out ${
                                                    isInView
                                                        ? `${LINE_DELAY_CLASSES[index]} opacity-100`
                                                        : "delay-0 opacity-0"
                                                }`}
                                                aria-hidden="true"
                                            />
                                        </div>
                                    ) : (
                                        <div className="hidden flex-1 items-center md:flex">
                                            <span
                                                className={`h-px flex-1 bg-accent/40 transition-opacity duration-500 ease-out ${
                                                    isInView
                                                        ? `${STEP_DELAY_CLASSES[index]} opacity-100`
                                                        : "delay-0 opacity-0"
                                                }`}
                                                aria-hidden="true"
                                            />
                                        </div>
                                    )}

                                    {EndIcon ? (
                                        <EndIcon
                                            className={`ml-auto h-6 w-6 shrink-0 text-accent ${stepAnimationClasses}`}
                                            aria-hidden="true"
                                        />
                                    ) : null}
                                </div>

                                {/* Card Content */}
                                <div className={stepAnimationClasses}>
                                    <h3 className="mt-4 mb-2 font-serif text-xl font-bold text-white">
                                        {t(step.titleKey)}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-slate-300">
                                        {t(step.textKey)}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
