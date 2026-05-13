import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Zap, FolderOpen, Activity, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { images } from '../assets/imgs/assets.js'

// ─── Website Types Slideshow Data ─────────────────────────────
const WEBSITE_TYPES = [
    {
        id: 1,
        label: "Landing Pages",
        badge: "High Conversion",
        badgeColor: "text-blue-600",
        badgeBorder: "border-blue-100",
        badgeShadow: "0 2px 8px rgba(37,99,235,0.10)",
        description: "Focused, conversion-driven pages",
        image: images.cafe,
    },
    {
        id: 2,
        label: "Corporate Websites",
        badge: "Enterprise Grade",
        badgeColor: "text-slate-600",
        badgeBorder: "border-slate-100",
        badgeShadow: "0 2px 8px rgba(100,116,139,0.10)",
        description: "Professional brand presence",
        image: images.business,
    },
    {
        id: 3,
        label: "E-Commerce",
        badge: "Revenue Ready",
        badgeColor: "text-emerald-600",
        badgeBorder: "border-emerald-100",
        badgeShadow: "0 2px 8px rgba(5,150,105,0.10)",
        description: "Scalable online stores",
        image: images.ecommerce,
    },
    {
        id: 4,
        label: "SaaS Dashboards",
        badge: "Data Driven",
        badgeColor: "text-violet-600",
        badgeBorder: "border-violet-100",
        badgeShadow: "0 2px 8px rgba(124,58,237,0.10)",
        description: "Analytics & admin panels",
        image: images.dashboard,
    },
    {
        id: 5,
        label: "Portfolio Sites",
        badge: "Creative First",
        badgeColor: "text-rose-600",
        badgeBorder: "border-rose-100",
        badgeShadow: "0 2px 8px rgba(225,29,72,0.10)",
        description: "Showcase your best work",
        image: images.portfolio,
    },
    {
        id: 6,
        label: "Booking Platforms",
        badge: "Always Available",
        badgeColor: "text-amber-600",
        badgeBorder: "border-amber-100",
        badgeShadow: "0 2px 8px rgba(217,119,6,0.10)",
        description: "Appointments & reservations",
        image: images.booking_platform,
    },
];

// ─── Stats Data ───────────────────────────────────────────────
const STATS = [
    { icon: Zap, value: "5+", label: "Years Experience" },
    { icon: FolderOpen, value: "25+", label: "Projects Delivered" },
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
  .slide-nav-btn {
    transition: background 0.2s ease, transform 0.2s ease;
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
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const bar = document.getElementById("about-uptime-bar");
                    if (bar) setTimeout(() => bar.classList.add("run"), 400);
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
                <div className="w-9 h-9 bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
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
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    id="about-uptime-bar"
                    className="about-progress-bar h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                />
            </div>
        </div>
    );
};

// ─── Image Slideshow ──────────────────────────────────────────
const ImageSlideshow = () => {
    const [current, setCurrent] = useState(0);
    const [fading, setFading] = useState(false);
    const autoRef = useRef(null);

    const startAuto = () => {
        clearInterval(autoRef.current);
        autoRef.current = setInterval(() => {
            setCurrent((c) => (c + 1) % WEBSITE_TYPES.length);
        }, 4000);
    };

    useEffect(() => {
        startAuto();
        return () => clearInterval(autoRef.current);
    }, []);

    const goTo = (index) => {
        if (index === current) return;
        setFading(true);
        setTimeout(() => {
            setCurrent(index);
            setFading(false);
        }, 300);
        startAuto();
    };

    const next = () => goTo((current + 1) % WEBSITE_TYPES.length);
    const prev = () => goTo((current - 1 + WEBSITE_TYPES.length) % WEBSITE_TYPES.length);

    const slide = WEBSITE_TYPES[current];

    return (
        <div
            className="about-image-card relative overflow-hidden border border-gray-200 bg-gray-100"
            style={{
                boxShadow: "0 16px 48px rgba(0,0,0,0.10)",
                aspectRatio: "4/3",
            }}
        >
            {/* ── Stacked images — cross-fade ── */}
            {WEBSITE_TYPES.map((item, i) => (
                <img
                    key={item.id}
                    src={item.image}
                    alt={item.label}
                    width={900}
                    height={675}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-full"
                    style={{
                        opacity: i === current ? 1 : 0,
                        transition: "opacity 0.6s ease",
                    }}
                />
            ))}

            {/* Subtle vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-transparent pointer-events-none" />

            {/* Bottom gradient for label contrast */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

            {/* ── Slide label (centered above dots) ── */}
            <div
                className="absolute bottom-[52px] left-1/2 -translate-x-1/2 text-white text-center pointer-events-none whitespace-nowrap"
                style={{ transition: "opacity 0.3s ease", opacity: fading ? 0 : 1 }}
            >
                <p className="text-[10px] uppercase tracking-widest font-medium text-white/70 mb-0.5">
                    {slide.description}
                </p>
                <h3 className="text-sm font-bold tracking-tight">{slide.label}</h3>
            </div>

            {/* ── Floating status badge — bottom left (unchanged) ── */}
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

            {/* ── Floating top-right performance chip — changes per slide ── */}
            <div
                className={`absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border ${slide.badgeBorder} rounded-full px-3 py-1.5`}
                style={{
                    boxShadow: slide.badgeShadow,
                    transition: "opacity 0.3s ease",
                    opacity: fading ? 0 : 1,
                }}
            >
                <Zap size={11} className={slide.badgeColor} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${slide.badgeColor}`}>
                    {slide.badge}
                </span>
            </div>

            {/* ── Prev arrow ── */}
            <button
                onClick={prev}
                className="slide-nav-btn lg:hidden absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm border border-gray-200 flex items-center justify-center shadow-sm"
                aria-label="Previous slide"
            >
                <ChevronLeft size={15} className="text-gray-700" />
            </button>

            {/* ── Next arrow ── */}
            <button
                onClick={next}
                className="slide-nav-btn lg:hidden absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm border border-gray-200 flex items-center justify-center shadow-sm"
                aria-label="Next slide"
            >
                <ChevronRight size={15} className="text-gray-700" />
            </button>

            {/* ── Dot / pill indicators ── */}
            <div className="absolute bottom-[18px] left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {WEBSITE_TYPES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className="rounded-full"
                        style={{
                            width: i === current ? 20 : 6,
                            height: 6,
                            background: i === current ? "#2563EB" : "rgba(255,255,255,0.6)",
                            transition: "width 0.3s ease, background 0.3s ease",
                        }}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

// ─── Main About Component ─────────────────────────────────────
const About = () => {
    injectStyles();

    useEffect(() => {
        AOS.init({ once: true, offset: 80 });
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
                                About Webentric
                            </span>
                        </div>

                        {/* Heading */}
                        <h2
                            data-aos="fade-up"
                            data-aos-delay="80"
                            data-aos-duration="600"
                            data-aos-once="true"
                            className="text-[clamp(2.4rem,4.5vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-gray-900 mb-6"
                        >
                            Modern Web Design &{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                Website Development
                            </span>{" "}
                            for Growing Businesses
                        </h2>

                        {/* Paragraph */}
                        <p
                            data-aos="fade-up"
                            data-aos-delay="160"
                            data-aos-duration="600"
                            data-aos-once="true"
                            className="text-gray-500 text-[clamp(0.95rem,1.4vw,1.05rem)] leading-[1.8] max-w-[560px] mb-10"
                        >
                            Webentric provides professional web design and website development
                            services in Delhi for businesses, startups, and brands looking to build
                            a strong online presence. We create fast, modern, mobile-responsive,
                            and SEO-friendly websites designed to improve credibility, generate
                            leads, and support long-term business growth.
                        </p>

                        {/* Top two stat cards */}
                        <div className="flex gap-4 mb-4">
                            {STATS.map((stat, i) => (
                                <StatCard key={stat.label} stat={stat} aosDelay={220 + i * 80} />
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
                            <span>
                                Helping businesses build modern, responsive, and SEO-optimized websites
                            </span>
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
                        {/* ── Slideshow replaces the static image card ── */}
                        <ImageSlideshow />
                        {/* <div className="flex items-center justify-center">
                            <button className="my-10">See Portfolio</button>
                        </div> */}

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