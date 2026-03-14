import React from 'react'
import { processSteps } from '../assets/data.js';
const HowWeWork = () => {
    return (
        <section className="bg-white py-5" id="process">
            <div className="max-w-[1200px] mx-auto px-6">
                {/* Heading */}
                <div data-aos="fade-right" className="text-center max-w-[700px] mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900">
                        How We Turn <span className='text-blue-500 underline underline-offset-4'>Your Idea</span> Into a Powerful Website
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Our streamlined development process ensures your website is built
                        efficiently, professionally, and tailored to your business goals.
                    </p>
                </div>

                {/* Process grid */}
                <div className="relative mt-16">
                    {/* Desktop connector lines */}
                    <div className="hidden lg:flex absolute top-1/2 left-16 right-16 -translate-y-1/2 h-px bg-blue-600" />

                    <div data-aos="fade-left" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {processSteps.map((step, index) => {
                            const Icon = step.icon;
                            const isFirst = index === 0;
                            const isLast = index === processSteps.length - 1;

                            return (
                                <div
                                    key={step.number}
                                    className={`relative bg-white rounded-xs p-8 shadow-sm border border-blue-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/50 transition-all duration-300
                    ${!isFirst && !isLast ? 'lg:mx-4' : ''}`}
                                >
                                    {/* Step number badge */}
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-blue-600 text-white rounded-sm flex items-center justify-center shadow-lg">
                                        <span className="text-lg font-bold leading-none tracking-tight">
                                            {step.number}
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mx-auto mb-6">
                                        <Icon className="text-2xl" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed text-center">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default HowWeWork