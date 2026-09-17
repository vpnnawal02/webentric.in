/*
 * Shared minimal graphics for the home screen.
 * One quiet visual language everywhere: hairlines, grids, rings, ticks.
 * Every primitive is decorative (aria-hidden), non-interactive
 * (pointer-events-none) and theme-aware (ink tokens / --wt-ink).
 */

export const Tick = ({ className = "" }) => (
    <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className={className}
    >
        <path d="M6.5 0v13M0 6.5h13" stroke="currentColor" strokeWidth="1" />
    </svg>
);

/* Four registration ticks pinned to the inside corners of a relative parent. */
export const CornerTicks = ({ className = "" }) => (
    <div
        aria-hidden="true"
        className={`pointer-events-none select-none absolute inset-0 z-10 ${className}`}
    >
        <Tick className="absolute top-3 left-4 sm:left-6 text-ink/25" />
        <Tick className="absolute top-3 right-4 sm:right-6 text-ink/25" />
        <Tick className="absolute bottom-3 left-4 sm:left-6 text-ink/25" />
        <Tick className="absolute bottom-3 right-4 sm:right-6 text-ink/25" />
    </div>
);

/* Blueprint hairline grid that dissolves outward. Position via className. */
export const GridFade = ({ className = "" }) => (
    <div
        aria-hidden="true"
        className={`pointer-events-none select-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--wt-ink)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--wt-ink)_5%,transparent)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_75%_85%_at_60%_40%,black_25%,transparent_78%)] ${className}`}
    />
);

/* Soft radial wash. Size/position via className. */
export const Glow = ({ className = "" }) => (
    <div
        aria-hidden="true"
        className={`pointer-events-none select-none absolute bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--wt-ink)_7%,transparent),transparent)] ${className}`}
    />
);

/* Thin ring with a single dot on its circumference. Size via className. */
export const RingDot = ({ className = "", dotClassName = "" }) => (
    <div
        aria-hidden="true"
        className={`pointer-events-none select-none absolute rounded-full border border-ink/15 ${className}`}
    >
        <span
            className={`absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink/50 ${dotClassName}`}
        />
    </div>
);

/* Minimal section index, e.g. — 01. Place inline with a section eyebrow. */
export const SectionIndex = ({ no, className = "" }) => (
    <span
        aria-hidden="true"
        className={`inline-flex items-center gap-3 text-[11px] tracking-[0.22em] text-ink/40 ${className}`}
    >
        <span className="h-px w-8 bg-ink/30" />
        <span>{no}</span>
    </span>
);
