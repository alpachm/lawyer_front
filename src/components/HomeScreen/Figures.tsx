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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Figures = () => {
    const { t } = useTranslation();

    return (
        <section className="bg-primary px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                    {METRICS.map((metric) => (
                        <div key={metric.labelKey}>
                            <div className="font-sans text-4xl font-bold lg:text-5xl">
                                <span className="text-white">{metric.value}</span>
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
