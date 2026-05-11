import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import {
    HiOutlineGlobeAlt,
    HiOutlineShoppingCart,
    HiOutlineArrowPath,
    HiOutlineMegaphone,
    HiOutlineWrenchScrewdriver,
    HiOutlineChartBar,
} from "react-icons/hi2";
import { FiArrowUpRight } from "react-icons/fi";


// ─── Service Data ─────────────────────────────────────────────────────────────
const services = [
    {
        id: "business-website",
        icon: HiOutlineGlobeAlt,
        title: "Business Website Development",
        description:
            "Professional, high-conversion websites architected to establish authoritative online presence and articulate your value proposition with precision.",
        size: "large",
        accent: "#3b82f6",
        to: "/portfolio",
    },
    {
        id: "ecommerce",
        icon: HiOutlineShoppingCart,
        title: "E-Commerce Development",
        description:
            "Robust digital storefronts featuring secure transaction pipelines, streamlined inventory management.",
        size: "wide",
        accent: "#3b82f6",
        to: "/portfolio",
    },
    {
        id: "redesign",
        icon: HiOutlineArrowPath,
        title: "Website Redesign",
        description:
            "Modernization of legacy systems, focusing on performance optimization.",
        size: "small",
        accent: "#3b82f6",
        to: "/portfolio",
    },
    {
        id: "landing",
        icon: HiOutlineMegaphone,
        title: "Landing Pages",
        description:
            "Conversion-optimized landing environments engineered for high-yield campaigns.",
        size: "small",
        accent: "#3b82f6",
        to: "/portfolio",
    },
    {
        id: "maintenance",
        icon: HiOutlineWrenchScrewdriver,
        title: "Maintenance & Support",
        description:
            "Continuous infrastructure monitoring, security patching, and structural updates.",
        size: "medium",
        accent: "#3b82f6",
        to: "/portfolio",
    },
    {
        id: "seo",
        icon: HiOutlineChartBar,
        title: "SEO Optimization",
        description:
            "Technical search engine alignment focusing on core web vitals and metadata architecture.",
        size: "medium",
        accent: "#3b82f6",
        to: "/portfolio",
    },
];


// ─── Single Card Component ────────────────────────────────────────────────────
const ServiceCard = ({ service, className = "", aosDelay = 0 }) => {
    const Icon = service.icon;
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={aosDelay}
            data-aos-duration="550"
            data-aos-easing="ease-out-quart"
            data-aos-once="true"
            className={`group relative flex flex-col justify-end overflow-hidden border border-blue-200 p-6 transition-all duration-300 hover:border-white/20 shadow-sm hover:shadow-lg ${className}`}
        >
            {/* Ambient glow on hover */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at 30% 70%, ${service.accent}14 0%, transparent 65%)`,
                }}
            />

            {/* Icon */}
            <div
                className="mb-4 w-10 h-10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${service.accent}1a`, border: `1px solid ${service.accent}30` }}
            >
                <Icon size={20} style={{ color: service.accent }} />
            </div>

            {/* Text */}
            <div className="flex-1 flex flex-col justify-end">
                <h3 className="text-black font-bold text-xl leading-snug mb-2">
                    {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {service.description}
                </p>
            </div>

            {/* Arrow link */}
            <Link
                to={service.to}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                style={{ color: service.accent }}
                aria-label={`Learn more about ${service.title}`}
            >
                See our work <FiArrowUpRight size={13} />
            </Link>

            {/* Bottom accent line */}
            <div
                className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(90deg, ${service.accent}, ${service.accent}40)` }}
            />
        </div>
    );
};


// ─── Main Services Section ────────────────────────────────────────────────────
const Services = () => {

    useEffect(() => {
        AOS.init({
            once: true,
            offset: 80,
        });
    }, []);

    const [businessWebsite, ecommerce, redesign, landing, maintenance, seo] = services;

    return (
        <section className="relative py-20 sm:py-28 bg-white overflow-hidden">

            {/* Subtle background grid */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="svc-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6b7280" strokeWidth="0.6" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#svc-grid)" />
                </svg>
            </div>

            {/* Ambient glows */}
            <div className="pointer-events-none absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-indigo-600/8 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">

                {/* Header */}
                <div
                    className="text-center mb-14"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-once="true"
                >
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-400 mb-4">
                        <span className="w-4 h-px bg-blue-400" />
                        Our Services
                        <span className="w-4 h-px bg-blue-400" />
                    </span>
                    <h2 className="text-black font-extrabold text-[clamp(2.2rem,4vw,2.8rem)] leading-tight tracking-tight mb-4">
                        Designed for Modern Businesses
                    </h2>
                    <p className="text-gray-800 text-[clamp(0.9rem,1.4vw,1.05rem)] max-w-[520px] mx-auto leading-relaxed">
                        A complete range of high-performance web development services engineered to
                        establish, optimize, and scale your digital infrastructure.
                    </p>
                </div>

                {/* ─── Bento Grid ──────────────────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* Business Website — tall card */}
                    <ServiceCard
                        service={businessWebsite}
                        className="sm:row-span-2 min-h-[280px] sm:min-h-0"
                        aosDelay={0}
                    />

                    {/* E-Commerce — wide card */}
                    <ServiceCard
                        service={ecommerce}
                        className="lg:col-span-2 min-h-[180px]"
                        aosDelay={90}
                    />

                    {/* Website Redesign */}
                    <ServiceCard
                        service={redesign}
                        className="min-h-[180px]"
                        aosDelay={180}
                    />

                    {/* Landing Pages */}
                    <ServiceCard
                        service={landing}
                        className="min-h-[180px]"
                        aosDelay={270}
                    />

                    {/* Maintenance */}
                    <ServiceCard
                        service={maintenance}
                        className="min-h-[180px]"
                        aosDelay={360}
                    />

                    {/* SEO */}
                    <ServiceCard
                        service={seo}
                        className="sm:col-span-2 lg:col-span-2 min-h-[180px]"
                        aosDelay={450}
                    />
                </div>

                {/* CTA strip */}
                <div
                    className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
                    data-aos="fade-up"
                    data-aos-delay="650"
                    data-aos-duration="500"
                    data-aos-once="true"
                >
                    <p className="text-gray-400 text-sm">
                        Not sure which service fits your project?
                    </p>
                    <Link to="/contact">
                        <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition-colors duration-200 active:scale-95 shadow-lg shadow-blue-500/25">
                            Talk to Us <FiArrowUpRight size={14} />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Services;