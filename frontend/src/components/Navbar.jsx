import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";

// ─── CSS injected once ────────────────────────────────────────
const NAVBAR_STYLES = `
  .nb-dropdown {
    opacity: 0;
    transform: translateY(8px) scale(0.97);
    pointer-events: none;
    transition: opacity 0.18s ease, transform 0.18s cubic-bezier(0.16,1,0.3,1);
  }
  .nb-dropdown.nb-open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }
  .nb-drawer {
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .nb-drawer.nb-open {
    transform: translateX(0);
  }
  .nb-backdrop {
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
  }
  .nb-backdrop.nb-open {
    opacity: 1;
    pointer-events: auto;
  }
  .nb-mobile-link {
    opacity: 0;
    transform: translateX(20px);
    transition: opacity 0.3s cubic-bezier(0.16,1,0.3,1),
                transform 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .nb-drawer.nb-open .nb-mobile-link { opacity: 1; transform: translateX(0); }
  .nb-drawer.nb-open .nb-mobile-link:nth-child(1) { transition-delay: 0.05s; }
  .nb-drawer.nb-open .nb-mobile-link:nth-child(2) { transition-delay: 0.10s; }
  .nb-drawer.nb-open .nb-mobile-link:nth-child(3) { transition-delay: 0.15s; }
  .nb-drawer.nb-open .nb-mobile-link:nth-child(4) { transition-delay: 0.20s; }
  .nb-drawer.nb-open .nb-mobile-link:nth-child(5) { transition-delay: 0.25s; }
  .nb-drawer-footer {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .nb-drawer.nb-open .nb-drawer-footer {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.32s;
  }
  .nb-icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.15s ease, transform 0.15s ease;
  }
  .nb-icon-wrap.nb-exit {
    opacity: 0;
    transform: rotate(90deg) scale(0.7);
  }
  .nb-accordion {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transition: grid-template-rows 0.22s cubic-bezier(0.16,1,0.3,1),
                opacity 0.22s ease;
  }
  .nb-accordion.nb-open {
    grid-template-rows: 1fr;
    opacity: 1;
  }
  .nb-accordion > div { overflow: hidden; }
  .nb-nav-active-bar {
    position: absolute;
    bottom: 4px;
    left: 12px;
    right: 12px;
    height: 2px;
    border-radius: 9999px;
    background: #3b82f6;
    transform: scaleX(0);
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
  }
  .nb-nav-link-active .nb-nav-active-bar {
    transform: scaleX(1);
  }
`;

let styleInjected = false;
function injectStyles() {
    if (styleInjected || typeof document === "undefined") return;
    const el = document.createElement("style");
    el.textContent = NAVBAR_STYLES;
    document.head.appendChild(el);
    styleInjected = true;
}

// ─── Nav Data ─────────────────────────────────────────────────
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

// ─── Navbar ───────────────────────────────────────────────────
const Navbar = () => {
    injectStyles();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (!dropdownRef.current?.contains(e.target)) setDropdownOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Lock body scroll when drawer is open
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
            {/* ── Sticky Navbar ── */}
            <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <NavLink to="/" className="flex items-center">
                            <span className="font-extrabold tracking-tight text-2xl">
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
                                        `relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${isActive
                                            ? "text-gray-900 nb-nav-link-active"
                                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                        }`
                                    }
                                >
                                    {label}
                                    <span className="nb-nav-active-bar" aria-hidden />
                                </NavLink>
                            ))}

                            {/* More dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen((p) => !p)}
                                    aria-expanded={dropdownOpen}
                                    aria-haspopup="true"
                                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                >
                                    More
                                    <ChevronDown
                                        size={15}
                                        className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                <div className={`nb-dropdown absolute right-0 top-full mt-2 w-58 bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-200/60 overflow-hidden z-50 py-1 ${dropdownOpen ? "nb-open" : ""}`}>
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
                                </div>
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
                            aria-expanded={mobileOpen}
                        >
                            <span className={`nb-icon-wrap absolute ${mobileOpen ? "nb-exit" : ""}`} aria-hidden={mobileOpen}>
                                <Menu size={25} />
                            </span>
                            <span className={`nb-icon-wrap absolute ${!mobileOpen ? "nb-exit" : ""}`} aria-hidden={!mobileOpen}>
                                <X size={25} />
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Backdrop ── */}
            <div
                className={`nb-backdrop fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden ${mobileOpen ? "nb-open" : ""}`}
                onClick={closeMobile}
                aria-hidden
            />

            {/* ── Mobile Drawer ── */}
            <div
                className={`nb-drawer fixed inset-0 z-50 w-full h-full bg-white shadow-2xl flex flex-col md:hidden ${mobileOpen ? "nb-open" : ""}`}
                aria-modal="true"
                role="dialog"
                aria-label="Navigation menu"
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
                    {NAV_LINKS.map(({ label, to }) => (
                        <div key={to} className="nb-mobile-link">
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
                        </div>
                    ))}

                    {/* Mobile More accordion */}
                    <div className="nb-mobile-link">
                        <button
                            onClick={() => setDropdownOpen((p) => !p)}
                            className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            aria-expanded={dropdownOpen}
                        >
                            More
                            <ChevronDown
                                size={15}
                                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        <div className={`nb-accordion ml-3 mt-1 border-l-2 border-blue-100 pl-3 ${dropdownOpen ? "nb-open" : ""}`}>
                            <div>
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
                            </div>
                        </div>
                    </div>
                </div>

                {/* Drawer footer */}
                <div className="nb-drawer-footer px-6 pb-8 pt-4 border-t border-gray-100">
                    <NavLink to="/contact" onClick={closeMobile}>
                        <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-all duration-200 active:scale-95 shadow-md shadow-blue-200">
                            Get a Free Quote
                        </button>
                    </NavLink>
                    <p className="text-center text-xs text-gray-400 mt-3">
                        webentric.in · Web Development Agency
                    </p>
                </div>
            </div>
        </>
    );
};

export default Navbar;