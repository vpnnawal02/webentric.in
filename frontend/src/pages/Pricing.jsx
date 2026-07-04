import React, { useState } from 'react';
import { pricingPackages, addons, faqs } from '../assets/data';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PopUpForm from '../components/PopUpForm';

const Pricing = () => {
    const [activeFaq, setActiveFaq] = useState(null);
    const [tooltip, setTooltip] = useState({
        show: false,
        content: '',
        x: 0,
        y: 0,
        id: '',
    });
    const [open, setOpen] = useState(false);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const handleFeatureHover = (e, desc, index, fIndex) => {
        const rect = e.currentTarget.getBoundingClientRect();

        setTooltip({
            show: true,
            content: desc,
            x: rect.left + rect.width / 2,
            y: rect.top - 14,
            id: `tooltip-${index}-${fIndex}`,
        });
    };

    const handleFeatureLeave = () => {
        setTooltip((prev) => ({ ...prev, show: false }));
    };

    return (
        <div className="bg-black min-h-screen text-white">
            <PopUpForm open={open} setOpen={setOpen} />

            <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 lg:py-20">
                {/* 1. Pricing Hero */}
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 md:mb-20">
                    <p className="text-[20px] uppercase tracking-[0.22em] text-white/60">
                        PRICING
                    </p>

                    <h1 className="text-3xl md:text-5xl font-medium tracking-[-0.04em] text-white leading-tight">
                        Transparent pricing for professional websites
                    </h1>

                    <p className="text-base md:text-lg text-white/58 leading-relaxed max-w-2xl mx-auto">
                        Choose a website package that fits your business needs. Every build is modern,
                        responsive, and optimized for performance, clarity, and long-term scalability.
                    </p>

                    <p className="text-sm text-white/38">
                        Custom projects and advanced features are also available.
                    </p>
                </div>

                {/* 2. Pricing Packages */}
                <div
                    data-aos="fade-up"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
                >
                    {pricingPackages.map((plan, index) => (
                        <div
                            key={index}
                            className={`
                                relative border p-8 transition-all duration-300
                                bg-white/[0.03] border-white/20 hover:bg-white/[0.05] hover:border-white/40
                                ${plan.popular ? 'bg-white/[0.05] border-white/50' : ''}
                            `}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-xl font-medium tracking-[-0.02em] text-white mb-4 text-center">
                                {plan.title}
                            </h3>

                            <p className="text-center text-white/50 text-sm uppercase tracking-[0.14em]">
                                Starting from
                            </p>

                            <div className="text-4xl md:text-5xl font-medium tracking-[-0.05em] text-white mb-2 text-center mt-2">
                                {plan.price}
                            </div>

                            <p className="text-white/50 text-sm text-center mb-8">
                                {plan.delivery}
                            </p>

                            <ul className="space-y-2 mb-10">
                                {plan.features.map((feature, fIndex) => (
                                    <li
                                        key={fIndex}
                                        className="flex items-start gap-3 px-3 py-3 border border-transparent hover:border-white/20 hover:bg-white/[0.03] cursor-help transition-all group"
                                        onMouseEnter={(e) => handleFeatureHover(e, feature.desc, index, fIndex)}
                                        onFocus={(e) => handleFeatureHover(e, feature.desc, index, fIndex)}
                                        onMouseLeave={handleFeatureLeave}
                                        onBlur={handleFeatureLeave}
                                        tabIndex={0}
                                        aria-describedby={tooltip.show && tooltip.id === `tooltip-${index}-${fIndex}` ? tooltip.id : undefined}
                                    >
                                        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>

                                        <span className="text-white/80 text-sm md:text-[15px] font-medium flex-1 leading-relaxed">
                                            {feature.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => setOpen(true)}
                                className="w-full bg-white text-black py-3 px-6 font-medium hover:bg-white/85 transition-all duration-200"
                            >
                                {plan.popular ? "Start Your Project" : "Get Started"}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Tooltip Overlay */}
                {tooltip.show && (
                    <div
                        id={tooltip.id}
                        role="tooltip"
                        className="fixed z-50 bg-white text-black text-sm px-4 py-3 shadow-2xl max-w-[260px] whitespace-pre-wrap border border-black/10 pointer-events-none"
                        style={{
                            left: `${tooltip.x}px`,
                            top: `${tooltip.y}px`,
                            transform: 'translateX(-50%) translateY(-100%)',
                        }}
                    >
                        {tooltip.content}
                    </div>
                )}

                {/* 3. Add-ons */}
                <div className="mb-20">
                    <h3 className="text-3xl font-medium tracking-[-0.03em] text-white text-center mb-10 md:mb-12">
                        Optional Add-ons
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {addons.map((addon, index) => (
                            <div
                                key={index}
                                className="bg-white/[0.03] border border-white/20 px-6 py-4 text-center hover:bg-white/[0.05] hover:border-white/40 transition-all"
                            >
                                <h4 className="font-medium text-white mb-1 text-sm md:text-base">
                                    {addon.name}
                                </h4>
                                <p className="text-white/55 font-medium text-sm md:text-lg">
                                    {addon.price}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. FAQ */}
                <div className="mb-12">
                    <h3 className="text-3xl font-medium tracking-[-0.03em] text-white text-center mb-12">
                        Frequently Asked Questions
                    </h3>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white/[0.03] border border-white/10 overflow-hidden transition-all"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(index)}
                                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/[0.03] transition-colors"
                                    aria-expanded={activeFaq === index}
                                >
                                    <h4 className="font-medium text-white text-lg pr-4">
                                        {faq.question}
                                    </h4>

                                    {activeFaq === index ? (
                                        <ChevronUp size={22} className="text-white/45 flex-shrink-0" />
                                    ) : (
                                        <ChevronDown size={22} className="text-white/45 flex-shrink-0" />
                                    )}
                                </button>

                                {activeFaq === index && (
                                    <div className="px-6 pb-6 pt-0">
                                        <p className="text-white/60 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;