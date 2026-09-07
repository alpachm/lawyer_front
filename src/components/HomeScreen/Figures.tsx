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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Figures = () => {
    const { t } = useTranslation();

    return (
        <section className="bg-primary px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                    {FIGURES.map((figure) => (
                        <div key={figure.id}>
                            <div className="font-sans text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl">
                                {figure.prefixKey && t(figure.prefixKey)}
                                <span className="text-accent">{t(figure.highlightKey)}</span>
                                {figure.suffixKey && t(figure.suffixKey)}
                            </div>
                            <p className="mt-2 font-sans text-sm text-white/90 lg:text-base">
                                {t(figure.subtitleKey)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
