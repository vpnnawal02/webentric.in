import React from 'react'
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { images } from "../assets/imgs/assets.js"

const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "Pricing", to: "/pricing" },
    { label: "Contact", to: "/contact" },
];

const DROPDOWN_LINKS = [
    { label: "Calculate Website Cost", to: "/calculator" },
    { label: "Custom Website", to: "/custom-website" },
    { label: "Free Consultation", to: "/consultation" },
];

// Active style helper for NavLink
const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${isActive
        ? "text-gray-900 font-semibold"
        : "text-gray-600 hover:text-gray-900"
    }`;


const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Close mobile menu on route change
    const handleMobileLinkClick = () => {
        setMobileOpen(false);
        setDropdownOpen(false);
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-45">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-auto">

                    {/* LEFT — Logo */}
                    <NavLink to="/" className="text-xl font-bold tracking-tight text-gray-900">
                        <h1 className='text-4xl py-5'><span className='text-blue-500'>WEB</span>ENTRIC<span className='text-blue-500'>.</span></h1>
                    </NavLink>

                    {/* RIGHT — Desktop Nav */}
                    <div className="hidden md:flex items-center gap-4">
                        {NAV_LINKS.map(({ label, to }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === "/"}
                                className={({ isActive }) =>
                                    `px-3 py-1.5 text-md font-medium transition-colors duration-200 ${isActive
                                        ? "font-semibold"
                                        : "text-gray-600 hover:underline decoration-blue-400 underline-offset-30 decoration-4"
                                    }`
                                }
                                style={({ isActive }) =>
                                    isActive
                                        ? {
                                            textDecoration: 'underline',
                                            textDecorationColor: '#2196f3',
                                            textDecorationThickness: '4px',
                                            textUnderlineOffset: '30px'
                                        }
                                        : {}
                                }
                            >
                                {label}
                            </NavLink>
                        ))}

                        {/* Dropdown — More */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen((prev) => !prev)}
                                className="flex items-center gap-1 px-3 py-1.5 text-md font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            >
                                More
                                <ChevronDown
                                    size={15}
                                    className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 shadow-md z-50">
                                    {DROPDOWN_LINKS.map(({ label, to }) => (
                                        <NavLink
                                            key={to}
                                            to={to}
                                            onClick={() => setDropdownOpen(false)}
                                            className={({ isActive }) =>
                                                `block px-4 py-2.5 text-sm transition-colors duration-150 ${isActive
                                                    ? "font-semibold"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                                }`
                                            }
                                            style={({ isActive }) =>
                                                isActive ? { backgroundColor: 'black', color: 'white' } : {}
                                            }
                                        >
                                            {label}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hamburger — Mobile */}
                    <button
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={35} /> : <Menu size={35} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="border-t border-gray-200 bg-white px-4 py-3 flex flex-col gap-1">
                    {NAV_LINKS.map(({ label, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            onClick={handleMobileLinkClick}
                            className={({ isActive }) =>
                                `block px-3 py-2 text-sm font-medium transition-colors ${isActive ? "font-semibold" : "text-gray-600"
                                }`
                            }
                            style={({ isActive }) =>
                                isActive ? { backgroundColor: 'black', color: 'white' } : {}
                            }
                        >
                            {label}
                        </NavLink>
                    ))}

                    {/* Mobile Dropdown — More */}
                    <div>
                        <button
                            onClick={() => setDropdownOpen((prev) => !prev)}
                            className="flex items-center gap-1 w-full px-3 py-2 text-sm font-medium text-gray-600"
                        >
                            More
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {dropdownOpen && (
                            <div className="pl-3 flex flex-col gap-0.5 mt-1">
                                {DROPDOWN_LINKS.map(({ label, to }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        onClick={handleMobileLinkClick}
                                        className={({ isActive }) =>
                                            `block px-3 py-2 text-sm transition-colors ${isActive ? "font-semibold" : "text-gray-500"
                                            }`
                                        }
                                        style={({ isActive }) =>
                                            isActive ? { backgroundColor: 'black', color: 'white' } : {}
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav >
    );
}

export default Navbar
