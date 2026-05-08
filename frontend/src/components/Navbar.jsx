import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";

// ─── Nav Data ──────────────────────────────────────────────────────────────────
const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "Pricing", to: "/pricing" },
    { label: "Contact", to: "/contact" },
];

const DROPDOWN_LINKS = [
    { label: "Calculate Website Cost", to: "/price-calculator" },
    { label: "Admin Login", to: "/admin/login" },
];

// ─── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);

    // Shrink navbar on scroll
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (!dropdownRef.current?.contains(e.target)) setDropdownOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const closeMobile = () => {
        setMobileOpen(false);
        setDropdownOpen(false);
    };

    return (
        <>
            <nav
                className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
                    : "bg-white border-b border-gray-100"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                    <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>

                        {/* ── Logo ── */}
                        <NavLink to="/" className="flex items-center">
                            <span className={`font-extrabold tracking-tight transition-all duration-300 ${scrolled ? "text-2xl" : "text-3xl"}`}>
                                <span className="text-blue-500">WEB</span>
                                <span className="text-gray-900">ENTRIC</span>
                                <span className="text-blue-500">.</span>
                            </span>
                        </NavLink>

                        {/* ── Desktop Nav ── */}
                        <div className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map(({ label, to }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    end={to === "/"}
                                    className={({ isActive }) =>
                                        `relative px-4 py-2 text-md font-medium transition-colors duration-200 rounded-lg ${isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {label}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="nav-underline"
                                                    className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-blue-500"
                                                    transition={{ type: "spring", damping: 28, stiffness: 300 }}
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}

                            {/* Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen((p) => !p)}
                                    className="flex items-center gap-1 px-4 py-2 text-md font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                >
                                    More
                                    <ChevronDown
                                        size={15}
                                        className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute right-0 top-full mt-2 w-58 bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-200/60 overflow-hidden z-50 py-1"
                                        >
                                            {DROPDOWN_LINKS.map(({ label, to }) => (
                                                <NavLink
                                                    key={to}
                                                    to={to}
                                                    onClick={() => setDropdownOpen(false)}
                                                    className={({ isActive }) =>
                                                        `flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-150 ${isActive
                                                            ? "bg-blue-500 text-white font-semibold"
                                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                                        }`
                                                    }
                                                >
                                                    {({ isActive }) => (
                                                        <>
                                                            {label}
                                                            <ArrowUpRight size={13} className={isActive ? "text-white/70" : "text-gray-400"} />
                                                        </>
                                                    )}
                                                </NavLink>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* CTA */}
                            <NavLink to="/contact">
                                <button className="ml-5 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-all duration-200 active:scale-95 shadow-sm shadow-blue-200">
                                    Get a Quote
                                </button>
                            </NavLink>
                        </div>

                        {/* ── Hamburger ── */}
                        <button
                            onClick={() => setMobileOpen((p) => !p)}
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={mobileOpen ? "close" : "open"}
                                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                                    transition={{ duration: 0.18 }}
                                >
                                    {mobileOpen ? <X size={25} /> : <Menu size={25} />}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Mobile Drawer ─────────────────────────────────────────────────────── */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={closeMobile}
                        />

                        {/* Drawer panel — slides from right */}
                        <motion.div
                            key="drawer"
                            className="fixed inset-0 z-50 w-full h-full bg-white shadow-2xl flex flex-col md:hidden"

                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 280 }}
                        >
                            {/* Drawer header */}
                            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
                                <span className="text-xl font-extrabold tracking-tight">
                                    <span className="text-blue-500">WEB</span>
                                    <span className="text-gray-900">ENTRIC</span>
                                    <span className="text-blue-500">.</span>
                                </span>
                                <button
                                    onClick={closeMobile}
                                    className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Nav links */}
                            <div className="flex flex-col px-4 pt-10 pb-2 gap-1 flex-1 overflow-y-auto">
                                {NAV_LINKS.map(({ label, to }, i) => (
                                    <motion.div
                                        key={to}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 + i * 0.055, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <NavLink
                                            to={to}
                                            end={to === "/"}
                                            onClick={closeMobile}
                                            className={({ isActive }) =>
                                                `flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-all duration-150 ${isActive
                                                    ? "bg-blue-500 text-white font-semibold"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                                }`
                                            }
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    {label}
                                                    {isActive && <ArrowUpRight size={14} className="text-white/70" />}
                                                </>
                                            )}
                                        </NavLink>
                                    </motion.div>
                                ))}

                                {/* Mobile Dropdown — More */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.28, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <button
                                        onClick={() => setDropdownOpen((p) => !p)}
                                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        More
                                        <ChevronDown
                                            size={15}
                                            className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {dropdownOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden ml-3 mt-1 border-l-2 border-blue-100 pl-3"
                                            >
                                                {DROPDOWN_LINKS.map(({ label, to }) => (
                                                    <NavLink
                                                        key={to}
                                                        to={to}
                                                        onClick={closeMobile}
                                                        className={({ isActive }) =>
                                                            `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive
                                                                ? "bg-blue-500 text-white font-semibold"
                                                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                                            }`
                                                        }
                                                    >
                                                        {({ isActive }) => (
                                                            <>
                                                                {label}
                                                                <ArrowUpRight size={12} className={isActive ? "text-white/70" : "text-gray-400"} />
                                                            </>
                                                        )}
                                                    </NavLink>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>

                            {/* Drawer footer CTA */}
                            <motion.div
                                className="px-6 pb-8 pt-4 border-t border-gray-100"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.32, duration: 0.3 }}
                            >
                                <NavLink to="/contact" onClick={closeMobile}>
                                    <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-all duration-200 active:scale-95 shadow-md shadow-blue-200">
                                        Get a Free Quote
                                    </button>
                                </NavLink>
                                <p className="text-center text-xs text-gray-400 mt-3">
                                    webentric.in · Web Development Agency
                                </p>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;