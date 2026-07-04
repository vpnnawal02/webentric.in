import { useState } from "react";
import { supabase } from "../lib/supabase";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        honeypot: "",
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setStatus(null);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = "Name is required.";
        if (!form.phone.trim()) newErrors.phone = "Phone is required.";
        if (!form.message.trim()) newErrors.message = "Message is required.";

        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.honeypot) return;

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setStatus({
                type: "error",
                message: "Please fix the highlighted fields.",
            });
            return;
        }

        try {
            setSubmitting(true);
            setStatus(null);

            const { error } = await supabase.from("quote_requests").insert([
                {
                    name: form.name.trim(),
                    email: form.email.trim() || null,
                    phone: form.phone.trim(),
                    details: form.message.trim(),
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

            setStatus({
                type: "success",
                message: "Thanks! Your message has been sent. We’ll get back within 24 hours.",
            });

            setForm({
                name: "",
                email: "",
                phone: "",
                message: "",
                honeypot: "",
            });
            setErrors({});
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

    return (
        <section className="bg-black text-white min-h-screen">
            <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-14 py-14 md:py-20">
                <div className="max-w-3xl mb-12 md:mb-16">

                    <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.04em] font-medium text-white max-w-[12ch]">
                        Let&apos;s build something clear, fast, and memorable.
                    </h1>
                    <p className="mt-5 text-sm md:text-base text-white/58 max-w-[56ch] leading-relaxed">
                        Tell us what you&apos;re building, what you need, and where you want to go next.
                        We reply within 24 hours on business days.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-8 lg:gap-10 items-start">
                    <div className="bg-white/[0.03] border border-white/20 p-6 md:p-8 lg:p-10">
                        <div className="flex items-center justify-between gap-4 mb-8 border-b border-white/40 pb-5">
                            <h2 className="text-xl md:text-2xl font-medium tracking-[-0.02em] text-white">
                                Send a project enquiry
                            </h2>
                            <span className="text-[20px] uppercase tracking-[0.18em] text-white/60">
                                Webentric
                            </span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input
                                type="text"
                                name="honeypot"
                                value={form.honeypot}
                                onChange={handleChange}
                                className="hidden"
                                autoComplete="off"
                                tabIndex={-1}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[12px] uppercase tracking-[0.14em] text-white/55 mb-2">
                                        Name <span className="text-white/90">*</span>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                        className={`w-full bg-transparent border px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors ${errors.name
                                            ? "border-red-400/70 focus:border-red-400"
                                            : "border-white/30 focus:border-white/40"
                                            }`}
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-xs text-red-300">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[12px] uppercase tracking-[0.14em] text-white/55 mb-2">
                                        Phone <span className="text-white/90">*</span>
                                    </label>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className={`w-full bg-transparent border px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors ${errors.phone
                                            ? "border-red-400/70 focus:border-red-400"
                                            : "border-white/30 focus:border-white/40"
                                            }`}
                                    />
                                    {errors.phone && (
                                        <p className="mt-2 text-xs text-red-300">{errors.phone}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[12px] uppercase tracking-[0.14em] text-white/55 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@company.com"
                                    className={`w-full bg-transparent border px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors ${errors.email
                                        ? "border-red-400/70 focus:border-red-400"
                                        : "border-white/30 focus:border-white/40"
                                        }`}
                                />
                                {errors.email && (
                                    <p className="mt-2 text-xs text-red-300">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-[12px] uppercase tracking-[0.14em] text-white/55 mb-2">
                                    Message <span className="text-white/90">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    rows={6}
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your project, goals, required pages or features, timeline, and budget range..."
                                    className={`w-full bg-transparent border px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none resize-none transition-colors ${errors.message
                                        ? "border-red-400/70 focus:border-red-400"
                                        : "border-white/30 focus:border-white/40"
                                        }`}
                                />
                                {errors.message && (
                                    <p className="mt-2 text-xs text-red-300">{errors.message}</p>
                                )}
                            </div>

                            {status && (
                                <p
                                    className={`text-sm ${status.type === "success" ? "text-green-300" : "text-red-300"
                                        }`}
                                >
                                    {status.message}
                                </p>
                            )}

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-black text-sm font-medium hover:bg-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                                >
                                    {submitting ? "Sending..." : "Send Message"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white/[0.03] border border-white/10 p-6 md:p-7">
                            <h3 className="text-sm font-medium tracking-[0.08em] uppercase text-white/70 mb-6">
                                Quick Contact
                            </h3>

                            <div className="space-y-5 text-sm">
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/35 mb-1">
                                        Email
                                    </p>
                                    <a
                                        href="mailto:webentric2026@gmail.com"
                                        className="text-white hover:text-white/70 transition-colors break-all"
                                    >
                                        webentric2026@gmail.com
                                    </a>
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/35 mb-1">
                                        Phone / WhatsApp
                                    </p>
                                    <p className="text-white/82">+91 9560342636</p>
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/35 mb-1">
                                        Availability
                                    </p>
                                    <p className="text-white/82">Mon–Fri, 10 AM – 6 PM IST</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-7 mt-7 border-t border-white/10 text-white/72">
                                <a
                                    href="https://www.linkedin.com/company/webentric"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>

                                <a
                                    href="https://www.instagram.com/webentric.in/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                    aria-label="Instagram"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.44-.645 1.44-1.44c0-.796-.644-1.44-1.44-1.44z" />
                                    </svg>
                                </a>

                                <a
                                    href="https://wa.me/message/IK7VVIWKOELZL1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                    aria-label="WhatsApp"
                                >
                                    <img
                                        className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity"
                                        src="https://img.icons8.com/material-outlined/96/whatsapp--v1.png"
                                        alt="WhatsApp"
                                    />
                                </a>
                            </div>
                        </div>

                        <div className="bg-white/[0.03] border border-white/10 p-6 md:p-7">
                            <h3 className="text-sm font-medium tracking-[0.08em] uppercase text-white/70 mb-4">
                                What to include
                            </h3>
                            <ul className="space-y-3 text-sm text-white/68">
                                <li>Type of website or web application</li>
                                <li>Key features and pages you need</li>
                                <li>Ideal timeline or launch date</li>
                                <li>Estimated budget range</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;