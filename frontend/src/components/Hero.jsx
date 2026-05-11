import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiArrowLeft,
  FiExternalLink,
  FiZap,
  FiShield,
  FiSearch,
  FiSmartphone,
} from "react-icons/fi";
import {
  HiOutlineGlobeAlt,
  HiOutlineShoppingCart,
  HiOutlineChartBar,
  HiOutlineWrenchScrewdriver,
  HiOutlineMegaphone,
  HiOutlineCursorArrowRays,
} from "react-icons/hi2";
import PopUpForm from "./PopUpForm";

// ─── CSS injected once at module level ───────────────────────
const HERO_STYLES = `
  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes heroFadeRight {
    from { opacity: 0; transform: translateX(28px) scale(0.97); }
    to   { opacity: 1; transform: translateX(0)    scale(1);    }
  }
  @keyframes progressFill {
    from { width: 0%; }
    to   { width: 100%; }
  }
  .hero-text-enter {
    animation: heroFadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both;
  }
  .hero-panel-enter {
    animation: heroFadeRight 0.6s cubic-bezier(0.16,1,0.3,1) both;
  }
  .hero-progress-bar {
    animation: progressFill 10s linear forwards;
  }
`;

let styleInjected = false;
function injectStyles() {
  if (styleInjected || typeof document === "undefined") return;
  const tag = document.createElement("style");
  tag.textContent = HERO_STYLES;
  document.head.appendChild(tag);
  styleInjected = true;
}

// ─── Slide Data ───────────────────────────────────────────────
const slides = [
  {
    id: "web-dev",
    tag: "WEB DEVELOPMENT AGENCY",
    title: "Build Modern Websites That Grow Your Business",
    description:
      "Webentric creates high-performance websites, e-commerce platforms, and digital experiences designed to increase visibility, generate leads, and help businesses scale online.",
    primaryBtn: { label: "Start Your Project", action: "popup" },
    secondaryBtn: { label: "Explore Services", to: "/portfolio" },
    icon: HiOutlineGlobeAlt,
    accentColor: "#2563eb",
    glowColor: "rgba(37, 99, 235, 0.15)",
    stats: [
      { value: "150+", label: "Projects Delivered" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "5★", label: "Avg Rating" },
    ],
    features: [
      { icon: FiZap, text: "Fast Loading Websites" },
      { icon: FiSmartphone, text: "Mobile-Responsive Design" },
      { icon: FiSearch, text: "SEO-Optimized Structure" },
      { icon: FiShield, text: "Affordable Pricing" },
    ],
  },
  {
    id: "corporate",
    tag: "CORPORATE WEBSITE SOLUTIONS",
    title: "Professional Corporate Websites Built for Trust & Growth",
    description:
      "Custom corporate websites designed to establish credibility, improve brand presence, and convert visitors into long-term customers.",
    primaryBtn: { label: "Build Corporate Website", action: "popup" },
    secondaryBtn: { label: "View Portfolio", to: "/portfolio" },
    icon: HiOutlineGlobeAlt,
    accentColor: "#2563eb",
    glowColor: "rgba(37, 99, 235, 0.15)",
    stats: [
      { value: "60+", label: "Corporate Clients" },
      { value: "3x", label: "Avg Lead Growth" },
      { value: "100%", label: "Custom Built" },
    ],
    features: [
      { icon: FiShield, text: "Brand-Aligned Design" },
      { icon: FiZap, text: "Performance Optimized" },
      { icon: FiSearch, text: "Lead Generation Ready" },
      { icon: FiSmartphone, text: "Fully Responsive" },
    ],
  },
  {
    id: "ecommerce",
    tag: "E-COMMERCE DEVELOPMENT",
    title: "Launch Scalable E-Commerce Websites That Drive Sales",
    description:
      "Fast, secure, and conversion-focused online stores with seamless checkout systems, payment integration, inventory management, and mobile optimization.",
    primaryBtn: { label: "Launch Online Store", action: "popup" },
    secondaryBtn: { label: "See Features", to: "/portfolio" },
    icon: HiOutlineShoppingCart,
    accentColor: "#2563eb",
    glowColor: "rgba(37, 99, 235, 0.15)",
    stats: [
      { value: "40+", label: "Stores Launched" },
      { value: "2.5x", label: "Avg Conversion Lift" },
      { value: "99.9%", label: "Uptime" },
    ],
    features: [
      { icon: FiShield, text: "Secure Payments" },
      { icon: FiZap, text: "Blazing-Fast Checkout" },
      { icon: FiSmartphone, text: "Mobile-First Commerce" },
      { icon: FiSearch, text: "Product SEO Built-In" },
    ],
  },
  {
    id: "landing",
    tag: "LANDING PAGE DESIGN",
    title: "High-Converting Landing Pages for Ads & Campaigns",
    description:
      "Optimized landing pages built to maximize conversions, improve ad performance, and turn traffic into qualified leads.",
    primaryBtn: { label: "Create Landing Page", action: "popup" },
    secondaryBtn: { label: "See Examples", to: "/portfolio" },
    icon: HiOutlineMegaphone,
    accentColor: "#2563eb",
    glowColor: "rgba(37, 99, 235, 0.15)",
    stats: [
      { value: "3x", label: "Higher CTR" },
      { value: "80+", label: "Pages Built" },
      { value: "48hr", label: "Avg Turnaround" },
    ],
    features: [
      { icon: FiZap, text: "Speed-Optimized" },
      { icon: FiSearch, text: "Ad Score Friendly" },
      { icon: HiOutlineCursorArrowRays, text: "CTA-Focused Layout" },
      { icon: FiShield, text: "A/B Test Ready" },
    ],
  },
  {
    id: "seo",
    tag: "SEO OPTIMIZATION SERVICES",
    title: "Improve Google Rankings & Grow Organic Traffic",
    description:
      "Technical SEO, on-page optimization, and performance-focused strategies that help your business rank higher and attract targeted customers.",
    primaryBtn: { label: "Boost SEO Rankings", action: "popup" },
    secondaryBtn: { label: "Learn More", to: "/portfolio" },
    icon: HiOutlineChartBar,
    accentColor: "#2563eb",
    glowColor: "rgba(37, 99, 235, 0.15)",
    stats: [
      { value: "Top 3", label: "Avg Ranking Goal" },
      { value: "5x", label: "Organic Traffic Lift" },
      { value: "30+", label: "Brands Ranked" },
    ],
    features: [
      { icon: FiSearch, text: "Technical SEO Audit" },
      { icon: FiZap, text: "Core Web Vitals" },
      { icon: FiShield, text: "On-Page Optimization" },
      { icon: HiOutlineChartBar, text: "Monthly Reporting" },
    ],
  },
  {
    id: "management",
    tag: "WEBSITE MANAGEMENT",
    title: "Keep Your Website Fast, Secure & Always Updated",
    description:
      "Ongoing website maintenance, security monitoring, performance optimization, backups, and technical support for uninterrupted business operations.",
    primaryBtn: { label: "Manage My Website", action: "popup" },
    secondaryBtn: { label: "View Support Plans", to: "/portfolio" },
    icon: HiOutlineWrenchScrewdriver,
    accentColor: "#2563eb",
    glowColor: "rgba(37, 99, 235, 0.15)",
    stats: [
      { value: "99.9%", label: "Uptime Guarantee" },
      { value: "24/7", label: "Monitoring" },
      { value: "<4hr", label: "Response Time" },
    ],
    features: [
      { icon: FiShield, text: "Security Monitoring" },
      { icon: FiZap, text: "Performance Tuning" },
      { icon: FiSearch, text: "Regular Backups" },
      { icon: FiSmartphone, text: "Tech Support Included" },
    ],
  },
];

const SLIDE_DURATION = 7000;
const total = slides.length;

// ─── Visual Panel ─────────────────────────────────────────────
// Memoized so it never re-renders unless slide.id changes
const VisualPanel = React.memo(({ slide, animKey }) => {
  const Icon = slide.icon;
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute inset-0 blur-3xl opacity-40 transition-all duration-1000"
        style={{ background: slide.glowColor }}
      />
      <div
        key={animKey}
        className="hero-panel-enter relative w-full max-w-[420px] bg-white/90 backdrop-blur-sm shadow-2xl border border-gray-300 p-7 overflow-hidden"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="ml-auto flex items-center gap-1 text-xs text-gray-400">
            <FiShield size={11} />
            <span>webentric.in</span>
          </div>
        </div>

        {/* Icon */}
        <div
          className="w-16 h-16 flex items-center justify-center mb-5"
          style={{ background: `${slide.accentColor}18` }}
        >
          <Icon size={32} style={{ color: slide.accentColor }} />
        </div>

        <p
          className="text-xs font-semibold uppercase tracking-widest mb-1"
          style={{ color: slide.accentColor }}
        >
          {slide.tag}
        </p>

        <h3 className="text-gray-900 font-bold text-lg leading-snug mb-4">
          {slide.title}
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {slide.stats.map((s) => (
            <div
              key={s.label}
              className="bg-gray-50/80 p-2.5 text-center"
            >
              <p className="font-extrabold text-gray-900 text-base leading-none">
                {s.value}
              </p>
              <p className="text-gray-400 text-[10px] mt-1 leading-tight">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// ─── Main Hero ────────────────────────────────────────────────
const Hero = () => {
  injectStyles(); // runs once, no re-render cost

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0); // bumped to re-trigger CSS animations

  const intervalRef = useRef(null);

  const goTo = useCallback((index) => {
    setCurrent((index + total) % total);
    setAnimKey((k) => k + 1);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
    setAnimKey((k) => k + 1);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
    setAnimKey((k) => k + 1);
  }, []);

  // Auto-advance — only setInterval, no rAF
  useEffect(() => {
    intervalRef.current = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  const slide = slides[current];

  // Stagger delays for text children (CSS animation-delay)
  const stagger = (i) => ({
    animationDelay: `${i * 100}ms`,
  });

  return (
    <>
      <PopUpForm open={open} setOpen={setOpen} />

      <section className="relative overflow-hidden flex flex-col justify-around bg-white">
        {/* Background blobs — pointer-events-none, no JS */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-50/40 rounded-full blur-3xl" />
        </div>

        {/* Main content */}
        <div className="relative z-10 w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 py-10">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-center min-h-[70vh]">

            {/* ── LEFT: Text panel ── */}
            <div className="flex flex-col justify-center flex-1">
              {/*
                One wrapper key — swapping key forces React to unmount/remount
                the div, which re-triggers the CSS animations on children.
                No Framer Motion, no JS per frame.
              */}
              <div key={animKey} className="flex flex-col">

                {/* Tag badge */}
                <div className="hero-text-enter mb-5" style={stagger(0)}>
                  <span
                    className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] px-3.5 py-1.5 border rounded-full"
                    style={{
                      color: slide.accentColor,
                      borderColor: `${slide.accentColor}40`,
                      background: `${slide.accentColor}0d`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: slide.accentColor }}
                    />
                    {slide.tag}
                  </span>
                </div>

                {/* Heading */}
                <h1
                  className="hero-text-enter text-gray-900 font-extrabold leading-[1.1] tracking-tight text-[clamp(2.5rem,4.5vw,3.8rem)] max-w-[620px] mb-5"
                  style={stagger(1)}
                >
                  {slide.title}
                </h1>

                {/* Description */}
                <p
                  className="hero-text-enter text-gray-600 text-[clamp(1rem,1.6vw,1.125rem)] leading-relaxed max-w-[560px] mb-8"
                  style={stagger(2)}
                >
                  {slide.description}
                </p>

                {/* CTA buttons */}
                <div
                  className="hero-text-enter flex flex-col sm:flex-row gap-3 mb-8"
                  style={stagger(3)}
                >
                  <button
                    onClick={() => setOpen(true)}
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white text-sm font-semibold shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: `linear-gradient(135deg, ${slide.accentColor}, ${slide.accentColor}cc)`,
                    }}
                  >
                    {slide.primaryBtn.label}
                    <FiArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>

                  <Link to={slide.secondaryBtn.to}>
                    <button className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 text-sm font-semibold border-2 border-gray-200 text-gray-700 bg-white hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200">
                      {slide.secondaryBtn.label}
                      <FiExternalLink size={14} />
                    </button>
                  </Link>
                </div>

                {/* Trust + features */}
                <div className="hero-text-enter" style={stagger(4)}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5 text-yellow-400 text-md">
                      {"★★★★★".split("").map((s, i) => (
                        <span key={i}>{s}</span>
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm font-medium">
                      Trusted by startups and growing businesses
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {slide.features.map(({ icon: FeatIcon, text }) => (
                      <div key={text} className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{ background: `${slide.accentColor}18` }}
                        >
                          <FeatIcon size={14} style={{ color: slide.accentColor }} />
                        </div>
                        <span className="text-gray-600 text-sm font-medium">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Visual panel (memoized) ── */}
            <div className="w-full lg:w-auto hidden lg:flex items-center justify-center">
              <VisualPanel slide={slide} animKey={animKey} />
            </div>
          </div>
        </div>

        {/* ── Bottom controls ── */}
        <div className="relative z-20 w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 pb-10">
          <div className="flex flex-row-reverse items-center justify-between gap-6">

            {/* Prev / Next */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous Slide"
                className="w-10 h-10 border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <FiArrowLeft size={17} />
              </button>
              <button
                onClick={next}
                aria-label="Next Slide"
                className="w-10 h-10 border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <FiArrowRight size={17} />
              </button>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2 flex-1">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative flex-1 max-w-[80px] h-1 rounded-full bg-gray-200 overflow-hidden"
                >
                  {/* Active: CSS keyframe fill — no rAF, no JS per frame */}
                  {i === current && (
                    <span
                      key={animKey} // re-triggers animation on slide change
                      className="hero-progress-bar absolute inset-y-0 left-0 rounded-full bg-blue-500"
                    />
                  )}
                  {/* Completed */}
                  {i < current && (
                    <span className="absolute inset-0 rounded-full bg-blue-500/60" />
                  )}
                </button>
              ))}
            </div>

            {/* Counter */}
            <div className="text-xs font-mono font-semibold text-gray-400 tabular-nums whitespace-nowrap">
              <span className="text-gray-800">
                {String(current + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(total).padStart(2, "0")}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;