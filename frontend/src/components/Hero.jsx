import React from 'react'
import { images } from '../assets/imgs/assets';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section
            className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Blurred background shapes */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 bg-blue-300/40 blur-3xl" />
            <div className="invisible lg:visible z-50 pointer-events-none absolute bottom-0 right-0 h-80 w-80 bg-blue-400/30 blur-3xl" />

            <div className="relative w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* LEFT: Text content */}
                    <div className="order-1 mt-10">
                        {/* Headline */}
                        <h1
                            className="font-extrabold leading-tight text-gray-900 text-4xl sm:text-5xl lg:text-[56px] max-w-[600px]">
                            High-Performance Websites Built to{" "}
                            <span className="text-blue-600">Grow Your Business</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="mt-5 max-w-[550px] text-[18px] sm:text-[20px] text-gray-600">
                            Custom websites designed for speed, mobile responsiveness, and SEO—helping businesses attract visitors, build credibility, and convert leads into customers.
                        </p>

                        {/* CTA buttons */}
                        <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                className=" w-full sm:w-auto px-7 sm:px-8  py-3.5 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-xs shadow-sm  hover:bg-blue-700  transition-color">
                                Get a Free Website Quote
                            </button>
                            <Link to='portfolio'>
                                <button
                                    className="w-full sm:w-auto px-7 sm:px-8 py-3.5 border-2 border-blue-600 text-blue-700 text-sm sm:text-base font-semibold rounded-xs bg-transparent hover:bg-blue-50 transition-color">
                                    View Our Work
                                </button>
                            </Link>
                        </div>

                        {/* Trust indicator */}
                        <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                            <div className="flex text-yellow-400">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                            </div>
                            <p>Trusted by startups and growing businesses.</p>
                        </div>

                        {/* Benefits list */}
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[14px] text-gray-700">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-[10px] text-green-600">
                                    ✓
                                </span>
                                <span>Fast Loading Websites</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-[10px] text-green-600">
                                    ✓
                                </span>
                                <span>Mobile-Responsive Design</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-[10px] text-green-600">
                                    ✓
                                </span>
                                <span>SEO-Optimized Structure</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-[10px] text-green-600">
                                    ✓
                                </span>
                                <span>Affordable Pricing</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Hero image */}
                    <div className="order-2 flex justify-center md:justify-end">
                        <div>
                            <img src={images.hero_img} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero
