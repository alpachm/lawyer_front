import { useTranslation } from "react-i18next";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

import aboutUsImage from "../../assets/HomeScreen/about-us.png";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Credential {
    textKey: "AboutUs.credentialOne" | "AboutUs.credentialTwo" | "AboutUs.credentialThree";
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CREDENTIALS: Credential[] = [
    { textKey: "AboutUs.credentialOne" },
    { textKey: "AboutUs.credentialTwo" },
    { textKey: "AboutUs.credentialThree" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <section className="bg-primary py-16 lg:py-24">
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
                        {t("AboutUs.body")}
                    </p>

                    {/* 5. Credentials Bullet List */}
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

                    {/* 6. Action CTA Button */}
                    <a
                        href="#contact"
                        className="flex items-center gap-2 self-start rounded-md bg-accent px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
                    >
                        {t("Actions.scheduleConsultation")}
                        <FiArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </section>
    );
};
