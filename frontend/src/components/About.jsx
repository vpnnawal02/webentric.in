import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Zap, FolderOpen, Activity, CheckCircle2 } from "lucide-react";
import about from '../assets/imgs/about.png'

// ─── Stats Data ───────────────────────────────────────────────
const STATS = [
    {
        icon: Zap,
        value: "5+",
        label: "Years Experience",
    },
    {
        icon: FolderOpen,
        value: "25+",
        label: "Projects Delivered",
    },
];

// ─── CSS injected once ────────────────────────────────────────
const ABOUT_STYLES = `
  .about-stat-card {
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1),
                box-shadow  0.25s cubic-bezier(0.16,1,0.3,1);
  }
  .about-stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(37,99,235,0.10);
  }
  .about-image-card {
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
                box-shadow  0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .about-image-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 36px 80px rgba(37,99,235,0.13);
  }
  .about-progress-bar {
    width: 0%;
    transition: width 1.3s cubic-bezier(0.16,1,0.3,1);
  }
  .about-progress-bar.run {
    width: 99.9%;
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1);   }
    50%       { opacity: 0.4; transform: scale(1.8); }
  }
  .ping-dot {
    animation: pulse-dot 1.6s ease-in-out infinite;
  }
`;

let styleInjected = false;
function injectStyles() {
    if (styleInjected || typeof document === "undefined") return;
    const el = document.createElement("style");
    el.textContent = ABOUT_STYLES;
    document.head.appendChild(el);
    styleInjected = true;
}

// ─── Stat Card ────────────────────────────────────────────────
const StatCard = ({ stat, aosDelay }) => {
    const Icon = stat.icon;
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={aosDelay}
            data-aos-duration="600"
            data-aos-once="true"
            className="about-stat-card flex-1 min-w-0 bg-white border border-gray-100 p-5 cursor-default"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
            <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={16} className="text-blue-500" />
                </div>
                <div>
                    <p className="text-3xl font-extrabold text-gray-900 leading-none tracking-tight">
                        {stat.value}
                    </p>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1.5">
                        {stat.label}
                    </p>
                </div>
            </div>
        </div>
    );
};

// ─── Uptime Card ──────────────────────────────────────────────
const UptimeCard = ({ aosDelay }) => {
    // Trigger progress bar after AOS reveals the card
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const bar = document.getElementById("about-uptime-bar");
                    if (bar) {
                        // small delay so AOS fade finishes first
                        setTimeout(() => bar.classList.add("run"), 400);
                    }
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        const card = document.getElementById("about-uptime-card");
        if (card) observer.observe(card);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            id="about-uptime-card"
            data-aos="fade-up"
            data-aos-delay={aosDelay}
            data-aos-duration="600"
            data-aos-once="true"
            className="about-stat-card bg-white border border-gray-100 p-5 cursor-default"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9   bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <Activity size={16} className="text-blue-500" />
                </div>
                <div>
                    <p className="text-3xl font-extrabold text-gray-900 leading-none tracking-tight">
                        99.9%
                    </p>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1.5">
                        Platform Uptime
                    </p>
                </div>
            </div>
            {/* Animated progress bar — CSS transition, triggered by IntersectionObserver */}
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    id="about-uptime-bar"
                    className="about-progress-bar h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                />
            </div>
        </div>
    );
};

// ─── Main About Component ─────────────────────────────────────
const About = () => {
    injectStyles();

    useEffect(() => {
        AOS.init({
            once: true,
            offset: 80,
        });
    }, []);

    return (
        <section className="relative bg-[#f8f8f6] py-20 sm:py-28 overflow-hidden">

            {/* Subtle background grid */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden>
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="about-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.6" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#about-grid)" />
                </svg>
            </div>

            {/* Ambient glows */}
            <div className="pointer-events-none absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-20 right-0 w-[350px] h-[300px] rounded-full bg-indigo-400/6 blur-3xl" aria-hidden />

            <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

                    {/* ── LEFT COLUMN ────────────────────────────────── */}
                    <div className="flex flex-col">

                        {/* Badge */}
                        <div
                            data-aos="fade-up"
                            data-aos-duration="600"
                            data-aos-once="true"
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-500 border border-blue-200 bg-blue-50 px-3.5 py-1.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                About Us
                            </span>
                        </div>

                        {/* Heading */}
                        <h2
                            data-aos="fade-up"
                            data-aos-delay="80"
                            data-aos-duration="600"
                            data-aos-once="true"
                            className="text-[clamp(2.4rem,4.5vw,3.6rem)] font-extrabold leading-[1.08] tracking-tight text-gray-900 mb-6"
                        >
                            Engineering{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                Digital Excellence
                            </span>
                        </h2>

                        {/* Paragraph */}
                        <p
                            data-aos="fade-up"
                            data-aos-delay="160"
                            data-aos-duration="600"
                            data-aos-once="true"
                            className="text-gray-500 text-[clamp(0.95rem,1.4vw,1.05rem)] leading-[1.8] max-w-[480px] mb-10"
                        >
                            We don't just build websites — we engineer high-performance digital
                            ecosystems. Our approach fuses technical mastery with an uncompromising
                            commitment to modern aesthetics, delivering scalable platforms that drive
                            enterprise growth.
                        </p>

                        {/* Top two stat cards */}
                        <div className="flex gap-4 mb-4">
                            {STATS.map((stat, i) => (
                                <StatCard
                                    key={stat.label}
                                    stat={stat}
                                    aosDelay={220 + i * 80}
                                />
                            ))}
                        </div>

                        {/* Uptime bar card */}
                        <UptimeCard aosDelay={380} />

                        {/* Trust line */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="460"
                            data-aos-duration="600"
                            data-aos-once="true"
                            className="mt-6 flex items-center gap-2 text-xs text-gray-400"
                        >
                            <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0" />
                            <span>Trusted by 150+ businesses across 12 industries worldwide</span>
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN — Visual Panel ──────────────── */}
                    <div
                        data-aos="fade-left"
                        data-aos-duration="700"
                        data-aos-delay="100"
                        data-aos-once="true"
                        className="relative w-full"
                    >
                        {/* Image card */}
                        <div
                            className="about-image-card relative overflow-hidden    border border-gray-200 bg-gray-100"
                            style={{
                                boxShadow: "0 16px 48px rgba(0,0,0,0.10)",
                                aspectRatio: "4/3",
                            }}
                        >
                            <img
                                src={about}
                                alt="Digital engineering operations environment"
                                width={900}
                                height={675}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />

                            {/* Subtle vignette overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-transparent pointer-events-none" />

                            {/* Floating status badge — bottom left */}
                            <div
                                className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2"
                                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="ping-dot absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                </span>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-700">
                                    Active Operations
                                </span>
                            </div>

                            {/* Floating top-right performance chip */}
                            <div
                                className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-blue-100 rounded-full px-3 py-1.5"
                                style={{ boxShadow: "0 2px 8px rgba(37,99,235,0.10)" }}
                            >
                                <Zap size={11} className="text-blue-500" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                                    High Performance
                                </span>
                            </div>
                        </div>

                        {/* Decorative dot grid */}
                        <div className="pointer-events-none absolute -bottom-6 -right-6 w-32 h-32 opacity-25" aria-hidden>
                            <svg width="128" height="128">
                                <defs>
                                    <pattern id="about-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                                        <circle cx="2" cy="2" r="1.5" fill="#3b82f6" />
                                    </pattern>
                                </defs>
                                <rect width="128" height="128" fill="url(#about-dots)" />
                            </svg>
                        </div>

                        {/* Vertical side label */}
                        <div className="hidden lg:flex absolute -right-8 top-1/2 -translate-y-1/2 items-center">
                            <div className="flex flex-col items-center gap-1.5">
                                <div className="w-px h-12 bg-gradient-to-b from-transparent via-blue-300 to-transparent" />
                                <span
                                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400"
                                    style={{ writingMode: "vertical-rl" }}
                                >
                                    Digital Infra
                                </span>
                                <div className="w-px h-12 bg-gradient-to-b from-transparent via-blue-300 to-transparent" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;