import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { FiArrowLeft, FiCalendar } from "react-icons/fi";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SectionTitleKey =
    | "PrivacyPolicy.sectionOneTitle"
    | "PrivacyPolicy.sectionTwoTitle"
    | "PrivacyPolicy.sectionThreeTitle"
    | "PrivacyPolicy.sectionFourTitle"
    | "PrivacyPolicy.sectionFiveTitle"
    | "PrivacyPolicy.sectionSixTitle"
    | "PrivacyPolicy.sectionSevenTitle";

type SectionBodyKey =
    | "PrivacyPolicy.sectionOneBodyOne"
    | "PrivacyPolicy.sectionOneBodyTwo"
    | "PrivacyPolicy.sectionTwoBody"
    | "PrivacyPolicy.sectionThreeBody"
    | "PrivacyPolicy.sectionFourBodyOne"
    | "PrivacyPolicy.sectionFourBodyTwo"
    | "PrivacyPolicy.sectionFiveBodyOne"
    | "PrivacyPolicy.sectionFiveBodyTwo"
    | "PrivacyPolicy.sectionSixBody"
    | "PrivacyPolicy.sectionSevenBody";

interface LegalSection {
    titleKey: SectionTitleKey;
    bodyKeys: SectionBodyKey[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const LEGAL_SECTIONS: LegalSection[] = [
    {
        titleKey: "PrivacyPolicy.sectionOneTitle",
        bodyKeys: [
            "PrivacyPolicy.sectionOneBodyOne",
            "PrivacyPolicy.sectionOneBodyTwo",
        ],
    },
    {
        titleKey: "PrivacyPolicy.sectionTwoTitle",
        bodyKeys: ["PrivacyPolicy.sectionTwoBody"],
    },
    {
        titleKey: "PrivacyPolicy.sectionThreeTitle",
        bodyKeys: ["PrivacyPolicy.sectionThreeBody"],
    },
    {
        titleKey: "PrivacyPolicy.sectionFourTitle",
        bodyKeys: [
            "PrivacyPolicy.sectionFourBodyOne",
            "PrivacyPolicy.sectionFourBodyTwo",
        ],
    },
    {
        titleKey: "PrivacyPolicy.sectionFiveTitle",
        bodyKeys: [
            "PrivacyPolicy.sectionFiveBodyOne",
            "PrivacyPolicy.sectionFiveBodyTwo",
        ],
    },
    {
        titleKey: "PrivacyPolicy.sectionSixTitle",
        bodyKeys: ["PrivacyPolicy.sectionSixBody"],
    },
    {
        titleKey: "PrivacyPolicy.sectionSevenTitle",
        bodyKeys: ["PrivacyPolicy.sectionSevenBody"],
    },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function PrivacyPolicyScreen() {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            {/* ---- Hero / Header ---- */}
            <section className="bg-primary py-16 lg:py-20">
                <div className="mx-auto max-w-4xl px-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-slate-300 transition-colors duration-200 hover:text-secondary"
                    >
                        <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
                        {t("Actions.backHome")}
                    </Link>

                    <span className="mt-8 block font-sans text-xs font-bold uppercase tracking-widest text-accent">
                        {t("PrivacyPolicy.subheading")}
                    </span>

                    <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
                        {t("PrivacyPolicy.title")}
                    </h1>

                    <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-slate-300">
                        {t("PrivacyPolicy.subtitle")}
                    </p>

                    <p className="mt-6 inline-flex items-center gap-2 font-sans text-sm text-slate-400">
                        <FiCalendar className="h-4 w-4" aria-hidden="true" />
                        {t("PrivacyPolicy.lastUpdated")}
                    </p>
                </div>
            </section>

            {/* ---- Legal Content ---- */}
            <section className="mx-auto max-w-4xl px-4 py-16 lg:py-24">
                <div className="space-y-8">
                    {LEGAL_SECTIONS.map((section) => (
                        <article key={section.titleKey} className="space-y-4">
                            <h2 className="font-serif text-2xl font-bold leading-tight text-primary sm:text-3xl">
                                {t(section.titleKey)}
                            </h2>
                            {section.bodyKeys.map((bodyKey) => (
                                <p
                                    key={bodyKey}
                                    className="font-sans text-base font-light leading-relaxed text-secondary-text"
                                >
                                    {t(bodyKey)}
                                </p>
                            ))}
                        </article>
                    ))}
                </div>

                {/* ---- Back to home CTA ---- */}
                <div className="mt-16 border-t border-slate-200 pt-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-sans font-semibold text-white transition-opacity duration-200 hover:opacity-90"
                    >
                        <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
                        {t("Actions.backHome")}
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default PrivacyPolicyScreen;
