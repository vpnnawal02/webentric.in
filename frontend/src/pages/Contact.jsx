import React from 'react'
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from 'react';

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        budget: "",
        message: "",
        honeypot: "",
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setStatus(null);
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required.";
        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        if (!form.projectType) newErrors.projectType = "Select a project type.";
        if (!form.budget) newErrors.budget = "Select a budget range.";
        if (!form.message.trim()) newErrors.message = "Message is required.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.honeypot) {
            setStatus({ type: "error", message: "Spam detected." });
            return;
        }
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setStatus(null);
            return;
        }
        // Simulate success
        setStatus({ type: "success", message: "Thanks! Your message has been sent. We’ll get back within 24 hours." });
        setForm({
            name: "",
            email: "",
            phone: "",
            projectType: "",
            budget: "",
            message: "",
            honeypot: "",
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-5 space-y-10">
                {/* Contact Hero */}
                <section className="text-center max-w-3xl mx-auto space-y-1">
                    <h1 className="text-3xl md:text-5xl font-semibold text-gray-900">
                        Let&apos;s <span className='text-blue-500'>Build Something</span> Together
                    </h1>
                    <p className="text-sm text-gray-500">
                        We reply within 24 hours on business days.
                    </p>
                </section>

                {/* Contact Form + Quick Info */}
                <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10 items-start">
                    {/* Form */}
                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 md:p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Honeypot */}
                            <input
                                type="text"
                                name="honeypot"
                                value={form.honeypot}
                                onChange={handleChange}
                                className="hidden"
                                autoComplete="off"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 rounded-xs border text-sm outline-none transition-colors ${errors.name
                                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                            : "border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
                                            }`}
                                        placeholder="Your full name"
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 rounded-xs border text-sm outline-none transition-colors ${errors.email
                                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                            : "border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
                                            }`}
                                        placeholder="you@company.com"
                                    />
                                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone (optional)
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-xs border border-gray-300 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            {/* Project Type & Budget */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Project Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Project Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="projectType"
                                        value={form.projectType}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 rounded-xs border text-sm outline-none bg-white ${errors.projectType
                                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                            : "border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
                                            }`}
                                    >
                                        <option value="">Select project type</option>
                                        <option value="website">Website</option>
                                        <option value="web-app">Web App</option>
                                        <option value="maintenance">Maintenance</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.projectType && (
                                        <p className="mt-1 text-xs text-red-500">{errors.projectType}</p>
                                    )}
                                </div>

                                {/* Budget */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Budget Range <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="budget"
                                        value={form.budget}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 rounded-xs border text-sm outline-none bg-white ${errors.budget
                                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                            : "border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
                                            }`}
                                    >
                                        <option value="">Select budget</option>
                                        <option value="under-10000">Under ₹10,000</option>
                                        <option value="10000-25000">₹10,000 – ₹25,000</option>
                                        <option value="25000-50000">₹25,000 – ₹50,000</option>
                                        <option value="50000-plus">₹50,000+</option>
                                    </select>
                                    {errors.budget && (
                                        <p className="mt-1 text-xs text-red-500">{errors.budget}</p>
                                    )}
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    value={form.message}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 rounded-xs border text-sm outline-none resize-none ${errors.message
                                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                        : "border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
                                        }`}
                                    placeholder="Tell us about your project, goals, and timeline..."
                                />
                                {errors.message && (
                                    <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                                )}
                            </div>

                            {/* Status */}
                            {status && (
                                <p
                                    className={`text-sm mt-2 ${status.type === "success" ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {status.message}
                                </p>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                className="mt-2 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xs hover:bg-blue-700 transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Quick Contact Info + Project Guide */}
                    <div className="space-y-6">

                        {/* Quick Contact Info */}
                        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 flex justify-between">

                            <div className="space-y-3 text-sm text-gray-700">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Contact</h3>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wide">Email</p>
                                    <a
                                        href="mailto:vn.nawal02@gmail.com"
                                        className="text-blue-600 hover:underline"
                                    >
                                        vn.nawal02gmail.com
                                    </a>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wide">
                                        Phone / WhatsApp
                                    </p>
                                    <p className="text-gray-800">+91 8851948143</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wide">
                                        Availability
                                    </p>
                                    <p className="text-gray-800">Mon–Fri, 10 AM – 6 PM IST</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-4 justify-around">
                                <a href="#" className="group hover:text-blue-400 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a href="#" className="group hover:text-blue-400 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.44-.645 1.44-1.44c0-.796-.644-1.44-1.44-1.44z" />
                                    </svg>
                                </a>
                                <a href="#" className="group hover:text-blue-400 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>

                            </div>
                        </div>

                        {/* Project Inquiry Guide */}
                        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                What to include in your message
                            </h3>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                                <li>Type of website or web application</li>
                                <li>Key features and pages you need</li>
                                <li>Ideal timeline or launch date</li>
                                <li>Estimated budget range</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Location Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Location
                        </h2>
                        <p className="text-sm text-gray-700">
                            Based in Delhi, India – serving clients worldwide. We&apos;re comfortable
                            working across time zones using modern remote collaboration tools.
                        </p>
                    </div>
                    <div className="hidden bg-white border border-gray-200 rounded-sm shadow-sm h-56 items-center justify-center text-xs text-gray-500">
                        Google Map / Location Embed Placeholder
                    </div>
                </section>

                {/* Final CTA */}
                <section className="text-center max-w-2xl mx-auto space-y-4 pt-10 border-t border-gray-200">
                    <h2 className="text-3xl font-semibold text-gray-900">
                        Ready to start your project?
                    </h2>
                    <p className="text-lg text-gray-600">
                        Share your idea with us and we&apos;ll help you turn it into a fast, modern, and conversion-focused website.
                    </p>
                    <button className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xs hover:bg-blue-700 transition-colors">
                        Send Us a Message
                    </button>
                </section>
            </div>
        </div>
    );
}

export default Contact
