// CustomWebsitePage.jsx
import { useState } from "react";

export default function CustomWebsitePage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        websiteType: "business",
        pages: "5-10",
        features: "",
        timeline: "3-6 months",
        budget: "50k-1L",
        details: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submitForm = (e) => {
        e.preventDefault();
        // Handle form submission (integrate with your backend)
        alert("Project request submitted! We'll get back to you within 24 hours.");
        setForm({
            name: "",
            email: "",
            company: "",
            websiteType: "business",
            pages: "5-10",
            features: "",
            timeline: "3-6 months",
            budget: "50k-1L",
            details: "",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            {/* ── 1. Hero Section ── */}
            <section className="pt-20 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/5 to-violet-600/10" />
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Content */}
                        <div className="lg:pr-12">
                            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 mb-6">
                                Custom Web Development
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                                Need a <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Custom Website</span>
                                for Your Business?
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                                We build bespoke web solutions for businesses needing advanced features, complex functionality,
                                and perfect alignment with their unique business goals. Beyond standard templates.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#form" className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl text-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-1">
                                    <span>Start Your Project</span>
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                                <a href="#capabilities" className="inline-flex items-center px-8 py-4 border-2 border-gray-200 rounded-xl text-lg font-semibold text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                                    View Capabilities
                                </a>
                            </div>
                        </div>
                        {/* Right: Visual */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-indigo-500/20 to-violet-500/20 backdrop-blur-xl rounded-3xl p-12 lg:p-16 border border-white/20 shadow-2xl">
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    {["📱", "💻", "🖥️"].map((icon, i) => (
                                        <div key={i} className="w-20 h-20 bg-white/80 rounded-2xl flex items-center justify-center shadow-lg">
                                            <span className="text-2xl">{icon}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3">
                                    <div className="h-2 bg-white/60 rounded-full" />
                                    <div className="h-2 bg-white/50 rounded-full w-3/4" />
                                    <div className="h-2 bg-white/40 rounded-full w-1/2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 pb-20">

                {/* ── 2. Who Needs Custom ── */}
                <section id="capabilities" className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Who Needs a Custom Website?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Perfect for businesses requiring advanced functionality beyond standard templates.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[
                            { icon: "🌐", title: "Web Applications", desc: "Interactive apps with complex user flows" },
                            { icon: "☁️", title: "SaaS Platforms", desc: "Subscription-based software solutions" },
                            { icon: "📅", title: "Booking Systems", desc: "Appointment & reservation platforms" },
                            { icon: "🛒", title: "Marketplaces", desc: "Multi-vendor e-commerce platforms" },
                            { icon: "🎓", title: "EdTech Platforms", desc: "Learning management systems" },
                            { icon: "📊", title: "Custom Dashboards", desc: "Analytics & management dashboards" },
                            { icon: "🔌", title: "API Integrations", desc: "Connect with any third-party service" },
                            { icon: "🏢", title: "Complex Business Sites", desc: "Advanced corporate websites" },
                        ].map((item, i) => (
                            <div key={i} className="group bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 hover:-translate-y-2">
                                <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">{item.icon}</span>
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 3. What We Build ── */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What We Can Build</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            From simple business sites to complex platforms, we deliver exceptional digital experiences.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: "🏢", title: "Business Websites", desc: "Professional sites that convert visitors" },
                            { icon: "🛍️", title: "E-commerce Platforms", desc: "Scalable online stores with inventory management" },
                            { icon: "⚙️", title: "Custom Web Apps", desc: "Tailored applications for your workflow" },
                            { icon: "📈", title: "Admin Dashboards", desc: "Powerful management interfaces" },
                            { icon: "👥", title: "Customer Portals", desc: "Self-service platforms for your clients" },
                            { icon: "🔗", title: "API Integrations", desc: "Seamless connections with any service" },
                        ].map((item, i) => (
                            <div key={i} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-3">
                                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:rotate-6 transition-transform">
                                    <span className="text-2xl">{item.icon}</span>
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 4. Tech Stack ── */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Technologies We Use</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Modern tools and frameworks for scalable, high-performance web applications.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Frontend",
                                techs: ["React", "Tailwind CSS", "JavaScript", "Next.js"],
                                color: "from-indigo-500 to-blue-500",
                            },
                            {
                                title: "Backend",
                                techs: ["FastAPI", "Django", "Node.js", "Python"],
                                color: "from-emerald-500 to-teal-500",
                            },
                            {
                                title: "Database",
                                techs: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
                                color: "from-purple-500 to-pink-500",
                            },
                            {
                                title: "Deployment",
                                techs: ["AWS", "Vercel", "Docker", "CI/CD"],
                                color: "from-orange-500 to-red-500",
                            },
                        ].map((stack, i) => (
                            <div key={i} className="text-center group">
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
                                    <h3 className={`text-lg font-bold mb-6 bg-gradient-to-r ${stack.color} bg-clip-text text-transparent`}>
                                        {stack.title}
                                    </h3>
                                    <div className="space-y-3">
                                        {stack.techs.map((tech) => (
                                            <div key={tech} className="group-hover:scale-105 transition-transform">
                                                <span className="inline-block px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 font-semibold text-gray-800">
                                                    {tech}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 5. Development Process ── */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Development Process</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Transparent, predictable, and proven methodology for every project.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute left-1/2 top-16 w-px h-full bg-gradient-to-b from-indigo-500/30 to-violet-500/30 hidden lg:block" />
                        <div className="grid lg:grid-cols-6 gap-8 lg:gap-0 items-center">
                            {[
                                { num: "01", title: "Project Discussion", desc: "Understand your vision and requirements" },
                                { num: "02", title: "Requirement Analysis", desc: "Define features, scope, and timeline" },
                                { num: "03", title: "Wireframe & Planning", desc: "Create detailed wireframes and architecture" },
                                { num: "04", title: "Development", desc: "Build your custom solution with precision" },
                                { num: "05", title: "Testing", desc: "Rigorous testing across all devices" },
                                { num: "06", title: "Launch & Support", desc: "Deploy and provide ongoing maintenance" },
                            ].map((step, i) => (
                                <div key={i} className={`relative z-10 ${i % 2 ? "lg:order-1" : "lg:order-2"}`}>
                                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                                {step.num}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">{step.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 6. Pricing Range ── */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Estimated Pricing Range</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
                            Transparent pricing based on project complexity and features.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Custom Business Website", range: "₹15,000 – ₹40,000", desc: "Professional sites with custom features" },
                            { title: "Web Applications", range: "₹40,000 – ₹1,50,000", desc: "Interactive apps with user accounts" },
                            { title: "Advanced Platforms / SaaS", range: "₹1,50,000+", desc: "Complex systems with multiple integrations" },
                        ].map((plan, i) => (
                            <div key={i} className="group bg-gradient-to-b from-white to-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 hover:-translate-y-2">
                                <h3 className="font-bold text-xl text-gray-900 mb-4">{plan.title}</h3>
                                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-4">
                                    {plan.range}
                                </div>
                                <p className="text-gray-600 mb-6">{plan.desc}</p>
                                <p className="text-xs text-gray-500 italic bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2">
                                    Final pricing depends on features, integrations, and project complexity.
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 7. Request Form ── */}
                <section id="form" className="mb-24">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 lg:p-12">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">Get Your Custom Project Estimate</h2>
                                <p className="text-xl text-gray-600">Tell us about your project and we'll provide a detailed quote within 24 hours.</p>
                            </div>
                            <form onSubmit={submitForm} className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                                    <input
                                        required
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company (Optional)</label>
                                    <input
                                        name="company"
                                        value={form.company}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="Your Company"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Website Type</label>
                                    <select
                                        name="websiteType"
                                        value={form.websiteType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    >
                                        <option value="business">Business Website</option>
                                        <option value="ecommerce">E-Commerce</option>
                                        <option value="webapp">Web Application</option>
                                        <option value="saas">SaaS Platform</option>
                                        <option value="custom">Custom Solution</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2"># of Pages</label>
                                    <select
                                        name="pages"
                                        value={form.pages}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    >
                                        <option value="5-10">5-10 pages</option>
                                        <option value="10-20">10-20 pages</option>
                                        <option value="20+">20+ pages</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Timeline</label>
                                    <select
                                        name="timeline"
                                        value={form.timeline}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    >
                                        <option value="1-3 months">1-3 months</option>
                                        <option value="3-6 months">3-6 months</option>
                                        <option value="6+ months">6+ months</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Range</label>
                                    <select
                                        name="budget"
                                        value={form.budget}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    >
                                        <option value="25k-50k">₹25k - ₹50k</option>
                                        <option value="50k-1L">₹50k - ₹1L</option>
                                        <option value="1L+">₹1L+</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Required Features</label>
                                    <textarea
                                        name="features"
                                        value={form.features}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="e.g., User authentication, payment gateway, admin dashboard, API integrations..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-vertical"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Details</label>
                                    <textarea
                                        name="details"
                                        value={form.details}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Share more about your project, business goals, or specific requirements..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-vertical"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        Get Project Estimate →
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                {/* ── 8. FAQ ── */}
                <section className="mb-24">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: "How long does a custom website take?",
                                    a: "Timeline varies by complexity: 4-6 weeks for business sites, 8-12 weeks for web apps, 3-6 months for complex platforms.",
                                },
                                {
                                    q: "Do you provide maintenance?",
                                    a: "Yes! We offer monthly maintenance packages including updates, security monitoring, and performance optimization.",
                                },
                                {
                                    q: "Will the website be SEO optimized?",
                                    a: "Absolutely. Every project includes SEO best practices, fast loading speeds, mobile optimization, and structured data.",
                                },
                                {
                                    q: "Can I upgrade the website later?",
                                    a: "Yes, our architecture is modular. We can add features, scale performance, or migrate to new technologies anytime.",
                                },
                                {
                                    q: "Do you provide hosting or deployment?",
                                    a: "We handle full deployment to platforms like Vercel, Netlify, or AWS. Hosting recommendations based on your needs.",
                                },
                            ].map((faq, i) => (
                                <div key={i} className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
                                    <details className="cursor-pointer">
                                        <summary className="font-semibold text-gray-900 text-lg marker:text-indigo-500 list-none flex items-center gap-3 pb-3">
                                            <span className="text-indigo-600 text-2xl">Q</span>
                                            {faq.q}
                                            <svg className="w-5 h-5 text-gray-400 ml-auto group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </summary>
                                        <p className="mt-4 text-gray-600 pl-8 pt-2 border-l-4 border-indigo-100">{faq.a}</p>
                                    </details>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 9. Final CTA ── */}
                <section className="text-center py-20 px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-gradient-to-r from-indigo-600/90 to-violet-600/90 backdrop-blur-xl rounded-3xl p-12 lg:p-16 border border-white/20 shadow-2xl">
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                Let's Build Your <span className="block">Custom Website</span>
                            </h2>
                            <p className="text-xl text-indigo-100 mb-10 max-w-xl mx-auto leading-relaxed">
                                Ready to transform your business with a powerful, custom-built web solution?
                                We're here to make it happen.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="#form" className="group inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl text-lg hover:shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:-translate-y-1">
                                    Start Your Project
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                                <a href="#form" className="inline-flex items-center px-8 py-4 border-2 border-white/50 rounded-xl text-white font-semibold hover:bg-white/10 transition-all duration-200">
                                    Schedule a Call
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

