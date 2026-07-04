import { FiArrowRight } from "react-icons/fi";
import { projects } from "../assets/data.js";
import PopUpForm from "../components/PopUpForm.jsx";
import React, { useState } from "react";

const Portfolio = () => {
    const [open, setOpen] = useState(false);

    return (
        <section className="bg-black py-10 md:py-14" id="portfolio">
            <PopUpForm open={open} setOpen={setOpen} />

            <div className="max-w-full mx-auto md:px-20 px-5">
                {/* Heading */}
                <div className="text-center max-w-[700px] mx-auto">


                    <h2 className="text-[40px] md:text-[5   0px] sm:text-4xl font-medium leading-tight tracking-[-0.03em] text-white">
                        Projects That Help Businesses Succeed Online
                    </h2>

                    <p className="mt-4 text-sm md:text-md lg:text-lg text-white/58">
                        Explore some of the websites and digital experiences we've built for
                        startups and growing businesses.
                    </p>
                </div>

                {/* Projects grid */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {projects.map((project, index) => (
                        <div
                            data-aos="fade-up"
                            key={index}
                            className="group bg-white/[0.03] border border-white/20 rounded-none overflow-hidden hover:bg-white/[0.05] hover:border-white/18 transition-all duration-300"
                        >
                            {/* Project image */}
                            <div className="relative overflow-hidden aspect-auto bg-white/5">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/22 to-transparent opacity-80 pointer-events-none" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-medium tracking-[-0.02em] text-white mb-2">
                                    {project.title}
                                </h3>

                                <p className="text-[15px] text-white/70 mb-3 leading-relaxed">
                                    {project.description}
                                </p>

                                <p className="text-xs uppercase tracking-[0.14em] text-white/35 mb-4">
                                    {project.tech}
                                </p>

                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-white/70 transition-colors"
                                >
                                    View Project
                                    <FiArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-sm sm:text-base text-white/70 mb-4">
                        Want a website like these for your business?
                    </p>

                    <button
                        onClick={() => setOpen(true)}
                        className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-black text-sm sm:text-base font-medium hover:bg-white/85 transition-colors w-full sm:w-auto"
                    >
                        Start Your Project
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;