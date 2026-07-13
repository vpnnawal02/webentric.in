import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowUpRight, Hexagon } from "lucide-react";

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
  .nb-drawer.nb-open { transform: translateX(0); }
  .nb-backdrop {
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
  }
  .nb-backdrop.nb-open { opacity: 1; pointer-events: auto; }
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
  .nb-icon-wrap.nb-exit { opacity: 0; transform: rotate(90deg) scale(0.7); }
  .nb-accordion {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transition: grid-template-rows 0.22s cubic-bezier(0.16,1,0.3,1),
                opacity 0.22s ease;
  }
  .nb-accordion.nb-open { grid-template-rows: 1fr; opacity: 1; }
  .nb-accordion > div { overflow: hidden; }
  .nb-nav-active-bar {
    position: absolute;
    bottom: -6px;
    left: 8px;
    right: 8px;
    height: 1.5px;
    border-radius: 9999px;
    background: #ffffff;
    transform: scaleX(0);
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
  }
  .nb-nav-link-active .nb-nav-active-bar { transform: scaleX(1); }
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
const LEFT_LINKS = [
    { label: "Home", to: "/" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "Blogs", to: "/blogs" },
];

const RIGHT_LINKS = [
    { label: "Pricing", to: "/pricing" },
    { label: "Contact", to: "/contact" },
];

const NAV_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS]; // used for mobile drawer

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

    useEffect(() => {
        const handler = (e) => {
            if (!dropdownRef.current?.contains(e.target)) setDropdownOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const closeMobile = () => {
        setMobileOpen(false);
        setDropdownOpen(false);
    };

    const linkClass = ({ isActive }) =>
        `relative px-3 py-2 text-[11px] sm:text-xs xl:text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-200 whitespace-nowrap ${isActive ? "text-white nb-nav-link-active" : "text-gray-400 hover:text-white"
        }`;

    return (
        <>
            {/* ── Sticky Navbar ── */}
            <nav className="sticky top-0 z-50 w-full bg-black border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex items-center justify-between h-16 lg:h-20">

                        {/* Logo — left on mobile/tablet */}
                        <NavLink to="/" className="flex items-center gap-2 lg:hidden">
                            <img src="/logo_circle.png" alt="" className="w-10 h-10" />
                            <span className="font-semibold tracking-[0.2em] text-lg sm:text-base text-white uppercase">
                                Webentric
                            </span>
                        </NavLink>

                        {/* ── Desktop Nav (lg+) — split around centered logo ── */}
                        <div className="hidden lg:flex items-center justify-between w-full">
                            <div className="flex items-center gap-2 xl:gap-4">
                                {LEFT_LINKS.map(({ label, to }) => (
                                    <NavLink key={to} to={to} end={to === "/"} className={linkClass}>
                                        {label}
                                        <span className="nb-nav-active-bar" aria-hidden />
                                    </NavLink>
                                ))}
                            </div>

                            {/* Centered logo */}
                            <NavLink to="/" className="flex items-center gap-2 mx-6">
                                <img src="/logo_circle.png" alt="" className="w-10 h-10" />
                                <span className="font-semibold tracking-[0.25em] text-base xl:text-lg text-white uppercase">
                                    Webentric
                                </span>
                            </NavLink>

                            <div className="flex items-center gap-2 xl:gap-4">
                                {RIGHT_LINKS.map(({ label, to }) => (
                                    <NavLink key={to} to={to} end={to === "/"} className={linkClass}>
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
                                        className="flex items-center gap-1 px-3 py-2 text-[11px] xl:text-[13px] font-medium tracking-[0.15em] uppercase text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        More
                                        <ChevronDown
                                            size={13}
                                            className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    <div
                                        className={`nb-dropdown absolute right-0 top-full mt-3 w-56 bg-black border border-white/10 rounded-lg shadow-xl shadow-black/60 overflow-hidden z-50 py-1 ${dropdownOpen ? "nb-open" : ""
                                            }`}
                                    >
                                        {DROPDOWN_LINKS.map(({ label, to }) => (
                                            <NavLink
                                                key={to}
                                                to={to}
                                                onClick={() => setDropdownOpen(false)}
                                                className={({ isActive }) =>
                                                    `flex items-center justify-between px-4 py-2.5 text-xs tracking-wide transition-colors duration-150 ${isActive
                                                        ? "bg-white text-black font-semibold"
                                                        : "text-gray-300 hover:text-white hover:bg-white/5"
                                                    }`
                                                }
                                            >
                                                {({ isActive }) => (
                                                    <>
                                                        {label}
                                                        <ArrowUpRight size={13} className={isActive ? "text-black/70" : "text-gray-500"} />
                                                    </>
                                                )}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <NavLink to="/contact">
                                    <button className="ml-3 px-5 py-2.5 border border-white/30 hover:border-white hover:bg-white hover:text-black text-white text-[11px] xl:text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-200 active:scale-95">
                                        Get a Quote
                                    </button>
                                </NavLink>
                            </div>
                        </div>

                        {/* ── Hamburger (below lg) ── */}
                        <button
                            onClick={() => setMobileOpen((p) => !p)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors relative"
                            aria-label="Toggle menu"
                            aria-expanded={mobileOpen}
                        >
                            <span className={`nb-icon-wrap absolute ${mobileOpen ? "nb-exit" : ""}`} aria-hidden={mobileOpen}>
                                <Menu size={24} />
                            </span>
                            <span className={`nb-icon-wrap absolute ${!mobileOpen ? "nb-exit" : ""}`} aria-hidden={!mobileOpen}>
                                <X size={24} />
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Backdrop ── */}
            <div
                className={`nb-backdrop fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden ${mobileOpen ? "nb-open" : ""}`}
                onClick={closeMobile}
                aria-hidden
            />

            {/* ── Mobile / Tablet Drawer ── */}
            <div
                className={`nb-drawer fixed inset-0 z-50 w-full h-full bg-black shadow-2xl flex flex-col lg:hidden ${mobileOpen ? "nb-open" : ""
                    }`}
                aria-modal="true"
                role="dialog"
                aria-label="Navigation menu"
            >
                <div className="flex items-center justify-between px-5 sm:px-6 pt-6 pb-4 border-b border-white/10">
                    <span className="flex items-center gap-2">
                        <img src="/logo_circle.png" alt="" className="w-10 h-10" />
                        <span className="text-sm sm:text-base font-semibold tracking-[0.2em] text-white uppercase">
                            Webentric
                        </span>
                    </span>
                    <button
                        onClick={closeMobile}
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-white/10 transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col px-4 sm:px-6 pt-8 pb-2 gap-1 flex-1 overflow-y-auto">
                    {NAV_LINKS.map(({ label, to }) => (
                        <div key={to} className="nb-mobile-link">
                            <NavLink
                                to={to}
                                end={to === "/"}
                                onClick={closeMobile}
                                className={({ isActive }) =>
                                    `flex items-center justify-between w-full px-4 py-3 text-sm font-medium tracking-widest uppercase transition-all duration-150 ${isActive
                                        ? "bg-white text-black font-semibold"
                                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {label}
                                        {isActive && <ArrowUpRight size={14} className="text-black/70" />}
                                    </>
                                )}
                            </NavLink>
                        </div>
                    ))}

                    <div className="nb-mobile-link">
                        <button
                            onClick={() => setDropdownOpen((p) => !p)}
                            className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium tracking-widest uppercase text-gray-300 hover:bg-white/5 transition-colors"
                            aria-expanded={dropdownOpen}
                        >
                            More
                            <ChevronDown
                                size={15}
                                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        <div className={`nb-accordion ml-3 mt-1 border-l-2 border-white/10 pl-3 ${dropdownOpen ? "nb-open" : ""}`}>
                            <div>
                                {DROPDOWN_LINKS.map(({ label, to }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        onClick={closeMobile}
                                        className={({ isActive }) =>
                                            `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm tracking-wide transition-colors ${isActive
                                                ? "bg-white text-black font-semibold"
                                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {label}
                                                <ArrowUpRight size={12} className={isActive ? "text-black/70" : "text-gray-500"} />
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nb-drawer-footer px-5 sm:px-6 pb-8 pt-4 border-t border-white/10">
                    <NavLink to="/contact" onClick={closeMobile}>
                        <button className="w-full py-3 border border-white/30 hover:bg-white hover:text-black text-white text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-200 active:scale-95">
                            Get a Free Quote
                        </button>
                    </NavLink>
                    <p className="text-center text-[11px] text-gray-500 mt-3 tracking-wide">
                        webentric.in · Web Development Agency
                    </p>
                </div>
            </div>
        </>
    );
};

export default Navbar;