import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    quote: string;
    stars: 4 | 5;
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

// TODO (i18n): Move testimonial copy into `locales/` (or a CMS) when available.
const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "María Fernández",
        role: "Directora de Operaciones",
        company: "Grupo Nexus",
        quote: "Su asesoría fue clave para resolver un litigio comercial que parecía imposible. Siempre con una claridad y un compromiso excepcionales.",
        stars: 5,
    },
    {
        id: 2,
        name: "Carlos Mendoza",
        role: "CEO",
        company: "Innovatech Solutions",
        quote: "Gracias a su estrategia jurídica logramos cerrar una adquisición compleja sin contratiempos. Un profesional de primer nivel.",
        stars: 5,
    },
    {
        id: 3,
        name: "Lucía Ramírez",
        role: "Gerente Legal",
        company: "Constructora Andina",
        quote: "Nos acompañó en la reestructuración de la empresa con rigor y empatía. Recomiendo su trabajo sin reservas.",
        stars: 4,
    },
    {
        id: 4,
        name: "Andrés Herrera",
        role: "Fundador",
        company: "FinPay",
        quote: "Protegió la propiedad intelectual de nuestra startup y nos dio la tranquilidad necesaria para crecer con seguridad.",
        stars: 5,
    },
    {
        id: 5,
        name: "Valentina Torres",
        role: "Directora Financiera",
        company: "Global Retail",
        quote: "Su defensa en el arbitraje superó todas nuestras expectativas. Comunicación impecable de principio a fin.",
        stars: 4,
    },
    {
        id: 6,
        name: "Ricardo Salazar",
        role: "Socio Director",
        company: "Inmobiliaria Horizonte",
        quote: "Un aliado estratégico que entiende el negocio y defiende nuestros intereses con una solidez admirable.",
        stars: 5,
    },
];

// The track repeats the list three times so the carousel can loop seamlessly
// without ever running out of cards to display.
const TRACK_ITEMS: Testimonial[] = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
const ORIGINAL_COUNT = TESTIMONIALS.length;

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

function getVisibleSlides(): 1 | 2 | 3 {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

function useVisibleSlides(): 1 | 2 | 3 {
    const [visibleSlides, setVisibleSlides] = useState<1 | 2 | 3>(getVisibleSlides);

    useEffect(() => {
        const handleResize = () => setVisibleSlides(getVisibleSlides());

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return visibleSlides;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Testimonials = () => {
    const { t } = useTranslation();
    const visibleSlides = useVisibleSlides();

    // `currentIndex` points at the first visible item of the repeated track.
    // Starting on the middle copy lets us slide both backwards and forwards.
    const [currentIndex, setCurrentIndex] = useState(ORIGINAL_COUNT);
    const [isAnimating, setIsAnimating] = useState(true);

    const step = 100 / visibleSlides;

    const handlePrev = () => setCurrentIndex((index) => index - 1);
    const handleNext = () => setCurrentIndex((index) => index + 1);

    // Re-enable the transition right after a seamless reposition has rendered.
    useEffect(() => {
        if (isAnimating) return;

        const frame = requestAnimationFrame(() => setIsAnimating(true));
        return () => cancelAnimationFrame(frame);
    }, [isAnimating]);

    // Safety clamp so rapid clicks never try to render a missing slide.
    const maxStartIndex = TRACK_ITEMS.length - visibleSlides;
    const safeIndex = Math.min(Math.max(currentIndex, 0), maxStartIndex);

    return (
        <section id="testimonials" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 lg:py-24">
            {/* ---- Header + Navigation ---- */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <header className="flex max-w-2xl flex-col items-start text-left">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-accent">
                        {t("Testimonials.subheading")}
                    </span>
                    <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
                        {t("Testimonials.title")}
                    </h2>
                    <p className="mt-4 font-sans text-base leading-relaxed text-secondary-text sm:text-lg">
                        {t("Testimonials.description")}
                    </p>
                </header>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handlePrev}
                        aria-label={t("Testimonials.prevAriaLabel")}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-primary shadow-sm transition-colors duration-200 hover:border-primary hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                        <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        aria-label={t("Testimonials.nextAriaLabel")}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-primary shadow-sm transition-colors duration-200 hover:border-primary hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                        <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>

            {/* ---- Carousel Viewport ---- */}
            <div className="mt-12 overflow-hidden">
                <div
                    className={`flex ${isAnimating ? "transition-transform duration-300 ease-out" : ""}`}
                    style={{ transform: `translateX(-${safeIndex * step}%)` }}
                    onTransitionEnd={(event) => {
                        if (event.propertyName !== "transform") return;

                        if (currentIndex < ORIGINAL_COUNT) {
                            setIsAnimating(false);
                            setCurrentIndex((index) => index + ORIGINAL_COUNT);
                        } else if (currentIndex >= ORIGINAL_COUNT * 2) {
                            setIsAnimating(false);
                            setCurrentIndex((index) => index - ORIGINAL_COUNT);
                        }
                    }}
                >
                    {TRACK_ITEMS.map((testimonial, index) => (
                        <div
                            key={`${testimonial.id}-${index}`}
                            className="w-full shrink-0 px-3 md:w-1/2 lg:w-1/3"
                        >
                            <article className="flex h-full flex-col rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                                <div
                                    className="flex items-center gap-1 text-gold"
                                    role="img"
                                    aria-label={`${testimonial.stars} / 5`}
                                >
                                    {Array.from({ length: testimonial.stars }, (_, starIndex) => (
                                        <FaStar
                                            key={starIndex}
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>

                                <p className="my-4 text-sm italic leading-relaxed text-secondary-text">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>

                                <div className="my-4 border-b border-gray-100" />

                                <h3 className="font-serif font-bold text-primary">
                                    {testimonial.name}
                                </h3>
                                <p className="text-xs text-secondary-text">
                                    {testimonial.role} · {testimonial.company}
                                </p>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
