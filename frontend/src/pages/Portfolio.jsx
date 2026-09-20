import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { projects } from "../assets/data.js";
import PopUpForm from "../components/PopUpForm.jsx";
import SEO from "../components/SEO.jsx";
import { SITE, webPageSchema, itemListSchema, breadcrumbSchema } from "../utils/seoMeta.js";
import React, { useState } from "react";

const Portfolio = () => {
    const [open, setOpen] = useState(false);

    return (
        <section className="bg-page py-10 md:py-14" id="portfolio">
            <SEO
                title="Our Web Design Work in Delhi, India | Webentric"
                description="Explore websites designed & developed by Webentric — schools, salons, cafes, stores & startups across Delhi NCR and India."
                keywords={["web design portfolio Delhi", "website examples India", "web development projects Delhi"]}
                canonical={`${SITE.url}/portfolio`}
                schema={[webPageSchema({ name: "Webentric Portfolio — Web Design Work in Delhi, India", url: `${SITE.url}/portfolio`, description: "Selected website design and development projects across Delhi NCR and India." }), itemListSchema({ name: "Webentric portfolio", url: `${SITE.url}/portfolio`, items: projects.map((p) => ({ name: p.title, url: p.link || `${SITE.url}/portfolio`, description: p.description, image: p.image })) }), breadcrumbSchema([{ name: "Home", url: SITE.url }, { name: "Portfolio", url: `${SITE.url}/portfolio` }])]}
            />
            <PopUpForm open={open} setOpen={setOpen} />

            <div className="max-w-full mx-auto md:px-20 px-5">
                {/* Heading */}
                <div className="text-center max-w-[700px] mx-auto">


                    <h1 className="text-[40px] md:text-[5   0px] sm:text-4xl font-medium leading-tight tracking-[-0.03em] text-ink">
                        Projects That Help Businesses Succeed Online
                    </h1>

                    <p className="mt-4 text-sm md:text-md lg:text-lg text-ink/58">
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
                            className="group bg-surface border border-edge rounded-none overflow-hidden hover:bg-raised hover:border-edge transition-all duration-300"
                        >
                            {/* Project image */}
                            <div className="relative overflow-hidden aspect-auto bg-surface">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/22 to-transparent opacity-80 pointer-events-none" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-medium tracking-[-0.02em] text-ink mb-2">
                                    {project.title}
                                </h3>

                                <p className="text-[15px] text-ink/70 mb-3 leading-relaxed">
                                    {project.description}
                                </p>

                                <p className="text-xs uppercase tracking-[0.14em] text-ink/35 mb-4">
                                    {project.tech}
                                </p>

                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-ink/70 transition-colors"
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
                    <p className="text-sm sm:text-base text-ink/70 mb-4">
                        Want a website like these for your business?
                    </p>

                    <button
                        onClick={() => setOpen(true)}
                        className="inline-flex items-center justify-center px-7 py-3.5 bg-accent text-on-accent text-sm sm:text-base font-medium hover:bg-accent/85 transition-colors w-full sm:w-auto"
                    >
                        Start Your Project
                    </button>

                    <p className="mt-6 text-xs sm:text-sm text-ink/45">
                        Or explore our{" "}
                        <Link to="/website-development" className="text-ink/70 hover:text-ink underline underline-offset-4 transition-colors">
                            website development
                        </Link>
                        {", "}
                        <Link to="/ecommerce-development" className="text-ink/70 hover:text-ink underline underline-offset-4 transition-colors">
                            ecommerce development
                        </Link>
                        {" "}and{" "}
                        <Link to="/website-redesign" className="text-ink/70 hover:text-ink underline underline-offset-4 transition-colors">
                            website redesign
                        </Link>
                        {" "}services.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;