import React from 'react'
import { useEffect, useRef, useState } from "react";
import { icons } from '../assets/imgs/assets';

export default function PopUpForm({ open, setOpen }) {
    const overlayRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        budget: "",
        details: "",
    });

    // ── Close on Escape key ──
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        if (open) document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, setOpen]);

    // ── Prevent background scroll ──
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    // ── Reset on close ──
    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setSubmitted(false);
                setForm({ name: "", email: "", phone: "", projectType: "", budget: "", details: "" });
            }, 300);
        }
    }, [open]);

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) setOpen(false);
    };

    if (!open) return null;

    return (
        <div

            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm
        animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div data-aos="zoom-in"
                className="relative w-full max-w-md bg-white rounded-sm shadow-xl
          animate-in zoom-in-95 fade-in duration-200 max-h-[90vh] overflow-y-auto"
            >
                {/* ── Header ── */}
                <div className="flex items-start justify-between p-6 pb-4 border-b border-gray-100">
                    <div>
                        <h2
                            id="modal-title"
                            className="text-xl font-bold text-gray-900"
                        >
                            Get a Project Quote
                        </h2>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-xs">
                            Tell us a few details about your project and we'll get back to you with a customized quote.
                        </p>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        className="ml-4 mt-0.5 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-sm text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                        aria-label="Close modal"
                    >
                        <icons.cross_icon className="w-5 h-5" />
                    </button>
                </div>

                {/* ── Body ── */}
                <div className="p-6">
                    {submitted ? (
                        /* ── Success State ── */
                        <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Quote Request Sent!</h3>
                                <p className="text-sm text-gray-500">
                                    Thanks, <span className="font-semibold text-gray-700">{form.name || "there"}</span>! We'll review your project and get back to you within 24 hours.
                                </p>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="mt-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-sm transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        /* ── Form ── */
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-900 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-900 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Phone / WhatsApp
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-900 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Project Type + Budget — side by side on sm+ */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Project Type
                                    </label>
                                    <select
                                        name="projectType"
                                        value={form.projectType}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-900
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                    >
                                        <option value="" disabled>Select type</option>
                                        <option value="business">Business Website</option>
                                        <option value="ecommerce">E-commerce Website</option>
                                        <option value="webapp">Web Application</option>
                                        <option value="landing">Landing Page</option>
                                        <option value="redesign">Website Redesign</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Estimated Budget
                                    </label>
                                    <select
                                        name="budget"
                                        value={form.budget}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-900
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                    >
                                        <option value="" disabled>Select budget</option>
                                        <option value="5k-10k">₹5,000 – ₹10,000</option>
                                        <option value="10k-25k">₹10,000 – ₹25,000</option>
                                        <option value="25k-50k">₹25,000 – ₹50,000</option>
                                        <option value="50k+">₹50,000+</option>
                                    </select>
                                </div>
                            </div>

                            {/* Project Details */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Project Details
                                </label>
                                <textarea
                                    name="details"
                                    value={form.details}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Describe your project, features you need, or any references."
                                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-900 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                />
                            </div>

                            {/* Submit */}
                            <div className="pt-1">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold
                    py-2.5 px-4 rounded-sm transition-all duration-200 text-sm"
                                >
                                    Get My Quote
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-3">
                                    We usually respond within 24 hours.
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
