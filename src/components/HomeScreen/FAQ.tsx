import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMinus, FiPlus } from "react-icons/fi";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FaqItem {
    questionKey: "FAQ.questionOne" | "FAQ.questionTwo" | "FAQ.questionThree" | "FAQ.questionFour";
    answerKey: "FAQ.answerOne" | "FAQ.answerTwo" | "FAQ.answerThree" | "FAQ.answerFour";
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FAQ_ITEMS: FaqItem[] = [
    { questionKey: "FAQ.questionOne", answerKey: "FAQ.answerOne" },
    { questionKey: "FAQ.questionTwo", answerKey: "FAQ.answerTwo" },
    { questionKey: "FAQ.questionThree", answerKey: "FAQ.answerThree" },
    { questionKey: "FAQ.questionFour", answerKey: "FAQ.answerFour" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const FAQ = () => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number): void => {
        setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
    };

    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                    {/* ---- Left Column: Introduction (Desktop 40%) ---- */}
                    <div className="lg:col-span-5">
                        <span className="font-sans text-xs font-bold uppercase tracking-widest text-accent">
                            {t("FAQ.subheading")}
                        </span>
                        <h2 className="my-4 font-serif text-3xl font-bold text-primary lg:text-4xl">
                            {t("FAQ.title")}
                        </h2>
                        <p className="font-sans text-base leading-relaxed text-secondary-text">
                            {t("FAQ.description")}
                        </p>
                    </div>

                    {/* ---- Right Column: Accordion (Desktop 60%) ---- */}
                    <div className="lg:col-span-7">
                        <div className="border-t border-gray-200">
                            {FAQ_ITEMS.map((item, index) => {
                                const isOpen = openIndex === index;
                                const panelId = `faq-panel-${index}`;
                                const triggerId = `faq-trigger-${index}`;

                                return (
                                    <div
                                        key={item.questionKey}
                                        className="border-b border-gray-200 py-4"
                                    >
                                        <button
                                            type="button"
                                            id={triggerId}
                                            aria-expanded={isOpen}
                                            aria-controls={panelId}
                                            onClick={() => handleToggle(index)}
                                            className="flex w-full cursor-pointer select-none items-center justify-between gap-4 font-serif font-medium text-primary"
                                        >
                                            <span className="text-2xl text-left">
                                                {t(item.questionKey)}
                                            </span>
                                            {isOpen ? (
                                                <FiMinus
                                                    className="h-5 w-5 shrink-0 text-accent transition-transform duration-200"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <FiPlus
                                                    className="h-5 w-5 shrink-0 text-accent transition-transform duration-200"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </button>

                                        <div
                                            id={panelId}
                                            role="region"
                                            aria-labelledby={triggerId}
                                            className={`grid transition-all duration-300 ease-in-out ${
                                                isOpen
                                                    ? "grid-rows-[1fr] opacity-100"
                                                    : "grid-rows-[0fr] opacity-0"
                                            }`}
                                        >
                                            <div className="overflow-hidden">
                                                <p className="pt-3 text-sm leading-relaxed text-gray-400">
                                                    {t(item.answerKey)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
