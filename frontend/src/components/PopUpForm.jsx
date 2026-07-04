import React, { useEffect, useRef, useState } from "react";
import { icons } from "../assets/imgs/assets";
import { supabase } from "../lib/supabase";

export default function PopUpForm({ open, setOpen }) {
    const overlayRef = useRef(null);

    const initialForm = {
        name: "",
        email: "",
        phone: "",
        details: "",
    };

    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null);
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setOpen(false);
        };

        if (open) document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, setOpen]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    useEffect(() => {
        if (!open) {
            const timer = setTimeout(() => {
                setSubmitted(false);
                setSubmitting(false);
                setStatus(null);
                setForm(initialForm);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        setStatus(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            setStatus(null);

            const { error } = await supabase.from("quote_requests").insert([
                {
                    name: form.name.trim(),
                    email: form.email.trim() || null,
                    phone: form.phone.trim(),
                    details: form.details.trim() || null,
                },
            ]);

            if (error) {
                console.error(error);
                setStatus({
                    type: "error",
                    message: "Submission failed. Please try again.",
                });
                return;
            }

            setSubmitted(true);
            setStatus({
                type: "success",
                message: "Request submitted successfully.",
            });
        } catch (err) {
            console.error(err);
            setStatus({
                type: "error",
                message: "Something went wrong. Please try again.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) setOpen(false);
    };

    if (!open) return null;

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="relative w-full max-w-md bg-neutral-950 border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.45)] animate-in zoom-in-95 fade-in duration-200 max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between p-6 pb-4 border-b border-white/10">
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-2">
                            Project Enquiry
                        </p>
                        <h2 id="modal-title" className="text-xl font-medium text-white tracking-[-0.03em]">
                            Get a Project Quote
                        </h2>
                        <p className="text-sm text-white/45 mt-2 leading-relaxed max-w-xs">
                            Tell us a few details about your project and we&apos;ll get back to you
                            with a customized quote.
                        </p>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="ml-4 mt-0.5 flex-shrink-0 w-9 h-9 flex items-center justify-center border border-white/10 text-white/55 hover:text-white hover:bg-white/5 transition-colors"
                        aria-label="Close modal"
                    >
                        <icons.cross_icon className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-white/6 border border-white/10 flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-white mb-1 tracking-[-0.02em]">
                                    Quote Request Sent
                                </h3>
                                <p className="text-sm text-white/50">
                                    Thanks,{" "}
                                    <span className="font-medium text-white/80">
                                        {form.name || "there"}
                                    </span>
                                    . We&apos;ll review your project and get back to you within 24 hours.
                                </p>
                            </div>

                            <button
                                onClick={() => setOpen(false)}
                                className="mt-2 px-6 py-2.5 bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/75 mb-1.5">
                                    Full Name <span className="text-white/35">*</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full border border-white/10 bg-black/30 px-3.5 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/75 mb-1.5">
                                    Phone / WhatsApp <span className="text-white/35">*</span>
                                </label>
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className="w-full border border-white/10 bg-black/30 px-3.5 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/75 mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full border border-white/10 bg-black/30 px-3.5 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/75 mb-1.5">
                                    Project Details
                                </label>
                                <textarea
                                    name="details"
                                    value={form.details}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Describe your project, features you need, or any references."
                                    className="w-full border border-white/10 bg-black/30 px-3.5 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all resize-none"
                                />
                            </div>

                            {status?.type === "error" && (
                                <p className="text-sm text-red-400">{status.message}</p>
                            )}

                            <div className="pt-1">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-white text-black hover:bg-neutral-200 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed font-medium py-3 px-4 transition-all duration-200 text-sm"
                                >
                                    {submitting ? "Submitting..." : "Get My Quote"}
                                </button>

                                <p className="text-center text-xs text-white/32 mt-3">
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