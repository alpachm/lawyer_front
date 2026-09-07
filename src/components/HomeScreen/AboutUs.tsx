import { useTranslation } from "react-i18next";
import type { IconType } from "react-icons";
import {
    FaArrowDown,
    FaArrowRight,
    FaBriefcase,
    FaGraduationCap,
    FaHandshake,
    FaLandmark,
    FaUserShield,
    FaUsers,
} from "react-icons/fa";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

import aboutUsImage from "../../assets/HomeScreen/about-us.png";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Credential {
    textKey: "AboutUs.credentialOne" | "AboutUs.credentialTwo" | "AboutUs.credentialThree";
}

interface ProfessionalProfileItem {
    icon: IconType;
    labelKey: "AboutUs.educationLabel" | "AboutUs.experienceLabel";
    valueKey: "AboutUs.educationValue" | "AboutUs.experienceValue";
}

interface WorkflowStep {
    labelKey:
        | "AboutUs.methodologyStepOne"
        | "AboutUs.methodologyStepTwo"
        | "AboutUs.methodologyStepThree"
        | "AboutUs.methodologyStepFour";
}

interface PracticeFocusItem {
    icon: IconType;
    titleKey:
        | "AboutUs.practiceCriminalTitle"
        | "AboutUs.practiceCommercialTitle"
        | "AboutUs.practiceCivilLaborTitle"
        | "AboutUs.practiceLitigationTitle";
    textKey:
        | "AboutUs.practiceCriminalText"
        | "AboutUs.practiceCommercialText"
        | "AboutUs.practiceCivilLaborText"
        | "AboutUs.practiceLitigationText";
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CREDENTIALS: Credential[] = [{ textKey: "AboutUs.credentialOne" }];

const PROFESSIONAL_PROFILE: ProfessionalProfileItem[] = [
    {
        icon: FaGraduationCap,
        labelKey: "AboutUs.educationLabel",
        valueKey: "AboutUs.educationValue",
    },
    {
        icon: FaBriefcase,
        labelKey: "AboutUs.experienceLabel",
        valueKey: "AboutUs.experienceValue",
    },
];

const WORKFLOW_STEPS: WorkflowStep[] = [
    { labelKey: "AboutUs.methodologyStepOne" },
    { labelKey: "AboutUs.methodologyStepTwo" },
    { labelKey: "AboutUs.methodologyStepThree" },
    { labelKey: "AboutUs.methodologyStepFour" },
];

const PRACTICE_FOCUS: PracticeFocusItem[] = [
    {
        icon: FaUserShield,
        titleKey: "AboutUs.practiceCriminalTitle",
        textKey: "AboutUs.practiceCriminalText",
    },
    {
        icon: FaHandshake,
        titleKey: "AboutUs.practiceCommercialTitle",
        textKey: "AboutUs.practiceCommercialText",
    },
    {
        icon: FaUsers,
        titleKey: "AboutUs.practiceCivilLaborTitle",
        textKey: "AboutUs.practiceCivilLaborText",
    },
    {
        icon: FaLandmark,
        titleKey: "AboutUs.practiceLitigationTitle",
        textKey: "AboutUs.practiceLitigationText",
    },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <section id="about" className="scroll-mt-20 bg-primary py-16 lg:py-24">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-12">
                {/* ---- Left Column: Image (Desktop 40%) ---- */}
                <div className="lg:col-span-5">
                    <img
                        src={aboutUsImage}
                        alt={t("AboutUs.imageAlt")}
                        className="h-auto w-full rounded-lg object-cover shadow-2xl ring-1 ring-white/10"
                        loading="lazy"
                    />
                </div>

                {/* ---- Right Column: Content (Desktop 60%) ---- */}
                <div className="flex flex-col gap-6 lg:col-span-7">
                    {/* 1. Subheading */}
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-accent">
                        {t("AboutUs.subheading")}
                    </span>

                    {/* 2. Main Title */}
                    <h2 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                        {t("AboutUs.title")}
                    </h2>

                    {/* 3. Featured Quote Subtitle */}
                    <p className="font-serif text-md italic leading-relaxed text-yellow-300">
                        &ldquo;{t("AboutUs.quote")}&rdquo;
                    </p>

                    {/* 4. Body Text */}
                    <p className="max-w-prose font-sans text-base font-light leading-relaxed text-slate-400 sm:text-lg">
                        {t("AboutUs.bodyOne")}
                    </p>

                    <p className="max-w-prose font-sans text-base font-light leading-relaxed text-slate-400 sm:text-lg">
                        {t("AboutUs.bodyTwo")}
                    </p>

                    {/* 5. Work Profile Highlight */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {PROFESSIONAL_PROFILE.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.labelKey}
                                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                                        <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-sans text-xs font-bold uppercase tracking-widest text-accent">
                                            {t(item.labelKey)}
                                        </span>
                                        <span className="mt-1 font-sans text-sm font-semibold text-white sm:text-base">
                                            {t(item.valueKey)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* 6. Credentials Bullet List */}
                    <ul className="flex flex-col gap-3">
                        {CREDENTIALS.map((credential) => (
                            <li key={credential.textKey} className="flex items-center gap-3">
                                <FiCheckCircle
                                    className="h-5 w-5 shrink-0 text-accent"
                                    aria-hidden="true"
                                />
                                <span className="font-sans text-sm text-white sm:text-base">
                                    {t(credential.textKey)}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* 7. Action CTA Button */}
                    <a
                        href="#contact"
                        className="flex items-center gap-2 self-start rounded-md bg-accent px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
                    >
                        {t("Actions.scheduleConsultation")}
                        <FiArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                </div>
            </div>
            {/* ---- Professional Details: Methodology & Practice Focus ---- */}
            <div className="mx-auto mt-16 max-w-7xl px-4 lg:mt-20">
                <div className="flex flex-col gap-10 lg:gap-12">
                    {/* Section 2: Work Methodology Summary */}
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-accent" aria-hidden="true" />
                            <h3 className="font-serif text-xl font-bold text-white sm:text-2xl">
                                {t("AboutUs.methodologyLabel")}
                            </h3>
                        </div>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                            {WORKFLOW_STEPS.map((step, index) => {
                                const isLast = index === WORKFLOW_STEPS.length - 1;

                                return (
                                    <div
                                        key={step.labelKey}
                                        className="flex flex-col gap-2 sm:flex-1 sm:flex-row sm:items-center sm:gap-3"
                                    >
                                        <div className="flex flex-1 items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                                                {index + 1}
                                            </span>
                                            <span className="font-sans text-sm font-semibold leading-snug text-white">
                                                {t(step.labelKey)}
                                            </span>
                                        </div>
                                        {!isLast && (
                                            <>
                                                <FaArrowDown
                                                    className="mx-auto h-4 w-4 shrink-0 text-accent sm:hidden"
                                                    aria-hidden="true"
                                                />
                                                <FaArrowRight
                                                    className="hidden h-4 w-4 shrink-0 text-accent sm:block"
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Section 3: Key Practice Focus Summary */}
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-accent" aria-hidden="true" />
                            <h3 className="font-serif text-xl font-bold text-white sm:text-2xl">
                                {t("AboutUs.practiceAreasLabel")}
                            </h3>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {PRACTICE_FOCUS.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <article
                                        key={item.titleKey}
                                        className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-5"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/15">
                                            <Icon
                                                className="h-5 w-5 text-accent"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <h4 className="font-serif text-base font-bold text-white sm:text-lg">
                                            {t(item.titleKey)}
                                        </h4>
                                        <p className="text-sm leading-relaxed text-slate-300">
                                            {t(item.textKey)}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
