import type { IconType } from "react-icons";
import {
    FaArrowRight,
    FaBalanceScale,
    FaBriefcase,
    FaBuilding,
    FaGavel,
    FaShieldAlt,
    FaUsers,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PracticeArea {
    icon: IconType;
    titleKey:
        | "PracticeAreas.corporateTitle"
        | "PracticeAreas.civilTitle"
        | "PracticeAreas.laborTitle"
        | "PracticeAreas.commercialTitle"
        | "PracticeAreas.intellectualTitle"
        | "PracticeAreas.litigationTitle";
    textKey:
        | "PracticeAreas.corporateText"
        | "PracticeAreas.civilText"
        | "PracticeAreas.laborText"
        | "PracticeAreas.commercialText"
        | "PracticeAreas.intellectualText"
        | "PracticeAreas.litigationText";
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PRACTICE_AREAS: PracticeArea[] = [
    {
        icon: FaBuilding,
        titleKey: "PracticeAreas.corporateTitle",
        textKey: "PracticeAreas.corporateText",
    },
    {
        icon: FaBalanceScale,
        titleKey: "PracticeAreas.civilTitle",
        textKey: "PracticeAreas.civilText",
    },
    {
        icon: FaUsers,
        titleKey: "PracticeAreas.laborTitle",
        textKey: "PracticeAreas.laborText",
    },
    {
        icon: FaBriefcase,
        titleKey: "PracticeAreas.commercialTitle",
        textKey: "PracticeAreas.commercialText",
    },
    {
        icon: FaShieldAlt,
        titleKey: "PracticeAreas.intellectualTitle",
        textKey: "PracticeAreas.intellectualText",
    },
    {
        icon: FaGavel,
        titleKey: "PracticeAreas.litigationTitle",
        textKey: "PracticeAreas.litigationText",
    },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const PracticeAreas = () => {
    const { t } = useTranslation();

    return (
        <section className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
            {/* ---- Header Section ---- */}
            <div className="w-full flex flex-col items-center text-center">
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-accent">
                    {t("PracticeAreas.subheading")}
                </span>
                <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
                    {t("PracticeAreas.title")}
                </h2>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-secondary-text sm:text-lg">
                    {t("PracticeAreas.description")}
                </p>
            </div>

            {/* ---- Practice Area Cards Grid ---- */}
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {PRACTICE_AREAS.map((area) => {
                    const Icon = area.icon;

                    return (
                        <article
                            key={area.titleKey}
                            className="group relative flex flex-col justify-between gap-4 overflow-hidden rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute left-0 top-0 bottom-0 w-1.5 origin-top scale-y-0 bg-secondary opacity-0 transition-all duration-300 ease-out group-hover:scale-y-100 group-hover:opacity-100"
                            />
                            <div className="flex flex-col gap-4">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                                    <Icon
                                        className="h-6 w-6 shrink-0 text-secondary"
                                        aria-hidden="true"
                                    />
                                </div>
                                <h3 className="font-serif text-xl font-bold text-primary">
                                    {t(area.titleKey)}
                                </h3>
                                <p className="text-base leading-relaxed text-secondary-text">
                                    {t(area.textKey)}
                                </p>
                            </div>

                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 self-start font-sans text-sm font-semibold text-accent transition-colors duration-200 hover:text-primary"
                            >
                                {t("Actions.learnMore")}
                                <FaArrowRight className="h-4 w-4" aria-hidden="true" />
                            </a>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};
