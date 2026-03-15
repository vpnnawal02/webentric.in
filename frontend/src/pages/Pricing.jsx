import React from 'react'
import { useState } from 'react';
import { pricingPackages, addons, faqs } from '../assets/data';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PopUpForm from '../components/PopUpForm';

const Pricing = () => {
    const [activeFaq, setActiveFaq] = useState(null);
    const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });
    const [open, setOpen] = useState(false);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const handleFeatureHover = (e, desc) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({
            show: true,
            content: desc,
            x: rect.left + rect.width / 2,
            y: rect.top - 20,
        });
    };

    const handleFeatureLeave = () => {
        setTooltip({ ...tooltip, show: false });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <PopUpForm open={open} setOpen={setOpen} />
            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* 1. Pricing Hero */}
                <div className="text-center max-w-3xl mx-auto space-y-2 mb-5 md:mb-20">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Transparent Pricing for Professional Websites
                    </h1>
                    <p className="text-lg hidden md:flex text-gray-600">
                        Choose a website package that fits your business needs. All websites are modern, responsive,
                        and optimized for performance.
                    </p>
                    <p className="text-sm text-gray-500">
                        Custom projects and advanced features also available.
                    </p>
                </div>

                {/* 2. Pricing Packages */}
                <div data-aos="fade-in" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {pricingPackages.map((plan, index) => (
                        <div
                            key={index}
                            className={`
                bg-white border border-gray-200 rounded-xs p-8 shadow-sm hover:shadow-md transition-all duration-300
                ${plan.popular ? 'ring-2 ring-blue-200 ring-offset-2' : ''}
                relative
              `}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-sm text-xs font-semibold">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{plan.title}</h3>
                            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 text-center">{plan.price}</div>
                            <p className="text-gray-500 text-sm text-center mb-2 md:mb-8">{plan.delivery}</p>

                            <ul className="space-y-0 md:space-y-1 mb-10">
                                {plan.features.map((feature, fIndex) => (
                                    <li
                                        key={fIndex}
                                        className="flex items-start gap-3 px-3 py-1 md:py-3 rounded-sm hover:bg-gray-50 cursor-help transition-all group"
                                        onMouseEnter={(e) => handleFeatureHover(e, feature.desc)}
                                        onMouseLeave={handleFeatureLeave}
                                    >
                                        <div className="w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 text-sm md:text-md font-medium flex-1">{feature.name}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => setOpen(true)}
                                className="w-full bg-blue-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-xs font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm">
                                {plan.popular ? "Start Your Project" : "Get Started"}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Tooltip Overlay */}
                {tooltip.show && (
                    <div
                        className="fixed z-50 bg-black text-white text-sm px-4 py-3 rounded-xs shadow-2xl max-w-[260px] whitespace-pre-wrap opacity-0 
                        translate-y-2 transition-all mt-16 right-0 left-0 duration-200 border border-gray-800"
                        style={{
                            left: `${tooltip.x}px`,
                            top: `${tooltip.y}px`,
                            transform: 'translateX(-80%) translateY(0)',
                            opacity: 1,
                        }}>
                        {tooltip.content}
                        <div className="absolute bottom-full left-1/2 transform  w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
                    </div>
                )}

                {/* 3. Add-ons */}
                <div className="mb-15">
                    <h3 className="text-3xl font-semibold text-gray-900 text-center mb-5 md:mb-12">Optional Add-ons</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {addons.map((addon, index) => (
                            <div key={index} className="bg-gray-50 border border-gray-200 rounded-xs px-6 py-2 text-center hover:bg-white hover:shadow-sm transition-all">
                                <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-md">{addon.name}</h4>
                                <p className="text-blue-600 font-medium text-md md:text-lg">{addon.price}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. FAQ */}
                <div className="mb-24">
                    <h3 className="text-3xl font-semibold text-gray-900 text-center mb-12">Frequently Asked Questions</h3>
                    <div className="max-w-3xl mx-auto space-y-4" >
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-xs overflow-hidden shadow-sm hover:shadow-md transition-all"
                                onClick={() => toggleFaq(index)}
                            >
                                <div className="p-6 flex items-center justify-between cursor-pointer">
                                    <h4 className="font-semibold text-gray-900 text-lg">{faq.question}</h4>
                                    {activeFaq === index ? (
                                        <ChevronUp size={24} className="text-gray-500" />
                                    ) : (
                                        <ChevronDown size={24} className="text-gray-500" />
                                    )}
                                </div>
                                {activeFaq === index && (
                                    <div className="px-6 pb-6 pt-0">
                                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
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