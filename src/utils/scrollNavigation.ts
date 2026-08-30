// ---------------------------------------------------------------------------
// Smooth scroll navigation
// ---------------------------------------------------------------------------
// Centralises in-page anchor scrolling so every navigation link behaves
// consistently: smooth movement and a fixed-header offset that is measured
// from the real header element instead of a hardcoded, breakable page offset.

const HEADER_SELECTOR = "#site-header";

const TOP_TARGETS = new Set<string>(["", "#", "#home", "#top"]);

export function getFixedHeaderHeight(): number {
    if (typeof window === "undefined") return 0;

    const header = document.querySelector<HTMLElement>(HEADER_SELECTOR);
    if (!header) return 0;

    return Math.round(header.getBoundingClientRect().height);
}

export function scrollToSection(hash: string): void {
    if (typeof window === "undefined") return;

    // "Inicio" / top of page: scroll back to the very top.
    if (TOP_TARGETS.has(hash)) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return;
    }

    if (!hash.startsWith("#")) return;

    const target = document.querySelector<HTMLElement>(hash);
    if (!target) return;

    const headerHeight = getFixedHeaderHeight();
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
        top: Math.max(top, 0),
        left: 0,
        behavior: "smooth",
    });
}
