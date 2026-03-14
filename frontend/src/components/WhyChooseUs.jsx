import React from 'react'
import { icons } from '../assets/imgs/assets.js'

const WhyChooseUs = () => {
    return (
        <section className="py-5 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* ── Left: Content ── */}
                    <div className="lg:pr-8 flex flex-col gap-25" data-aos="fade-right">
                        <div >
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                Why Choose Us
                            </h2>
                            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
                                We have highly skilled and experienced developers who build modern, reliable, and scalable
                                websites tailored to business needs. Our focus is delivering high-performance solutions that
                                help businesses grow online.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <icons.code2_icon className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-sm font-semibold text-gray-700">
                                Built using modern technologies and industry best practices.
                            </p>
                        </div>
                    </div>

                    {/* ── Right: Checklist ── */}
                    <div className="space-y-6 lg:pl-8 relative">
                        {/* Subtle background pattern */}
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/2 via-transparent to-violet-500/2 rounded-2xl -z-10" />
                        <div className="space-y-6">
                            {[
                                {
                                    title: "Experienced Developers",
                                    desc: "Our team includes experienced developers skilled in building scalable and reliable web solutions.",
                                    color: "from-blue-600 to-blue-600",
                                },
                                {
                                    title: "Modern Technology",
                                    desc: "We use modern frameworks and tools to ensure performance, security, and scalability.",
                                    color: "from-emerald-600 to-teal-600",
                                },
                                {
                                    title: "Fast Development",
                                    desc: "Our streamlined development workflow helps us deliver high-quality projects efficiently.",
                                    color: "from-orange-600 to-red-600",
                                },
                            ].map((benefit, index) => (
                                <div
                                    data-aos="fade-left"
                                    key={benefit.title}
                                    className="group flex items-start gap-4 p-4 hover:bg-white/50 backdrop-blur-sm rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-blue-100 hover:-translate-x-2 border border-transparent hover:border-blue-100"
                                >


                                    {/* Content */}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors mb-1">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                                            {benefit.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs
