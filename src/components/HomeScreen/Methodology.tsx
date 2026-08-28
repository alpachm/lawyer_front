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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Methodology = () => {
    const { t } = useTranslation();

    return (
        <section className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
            {/* ---- Header Section ---- */}
            <div className="flex w-full flex-col items-center text-center">
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-accent">
                    {t("Methodology.subheading")}
                </span>
                <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
                    {t("Methodology.title")}
                </h2>
            </div>

            {/* ---- Steps Timeline Grid ---- */}
            <div className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                {STEPS.map((step) => {
                    const ConnectorIcon = step.connectorIcon;
                    const EndIcon = step.endIcon;

                    return (
                        <article key={step.number} className="relative">
                            {/* Top Indicator Row */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                                    {step.number}
                                </div>

                                {ConnectorIcon ? (
                                    <div className="hidden flex-1 items-center md:flex">
                                        <span
                                            className="h-px flex-1 bg-accent/40"
                                            aria-hidden="true"
                                        />
                                        <ConnectorIcon
                                            className="ml-2 h-5 w-5 shrink-0 text-accent"
                                            aria-hidden="true"
                                        />
                                    </div>
                                ) : (
                                    <div className="hidden flex-1 items-center md:flex">
                                        <span
                                            className="h-px flex-1 bg-accent/40"
                                            aria-hidden="true"
                                        />
                                    </div>
                                )}

                                {EndIcon ? (
                                    <EndIcon
                                        className="ml-auto h-6 w-6 shrink-0 text-accent"
                                        aria-hidden="true"
                                    />
                                ) : null}
                            </div>

                            {/* Card Content */}
                            <h3 className="mt-4 mb-2 font-serif text-xl font-bold text-primary">
                                {t(step.titleKey)}
                            </h3>
                            <p className="text-sm leading-relaxed text-secondary-text">
                                {t(step.textKey)}
                            </p>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};
