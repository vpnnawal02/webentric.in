import React from "react";
import { services } from "../assets/data.js";

const Services = () => {
    return (
        <section className="bg-[#f9fafb] py-24" id="services">
            <div className="max-w-[1200px] mx-auto px-6">
                {/* Heading */}
                <div data-aos="fade-right" className="text-center max-w-[700px] mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900">
                        <span className="text-blue-500 underline underline-offset-4">Website Solutions</span> Designed for Modern Businesses
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        A complete range of web development services to help businesses
                        establish, improve, and scale their online presence.
                    </p>
                </div>

                {/* Services grid */}
                <div
                    data-aos="fade-up"
                    className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.title}
                                className="bg-white rounded-sm p-6 shadow-sm border border-gray-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-500 transition-all duration-300 flex flex-col"
                            >
                                <div className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-blue-50 text-blue-600 mb-4">
                                    <Icon className="text-xl" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section >
    );
}

export default Services
