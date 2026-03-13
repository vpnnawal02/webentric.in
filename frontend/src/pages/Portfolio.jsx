import { FiArrowRight } from "react-icons/fi";
import { projects } from "../assets/data.js";


const Portfolio = () => {
    return (
        <section className="bg-gray-50 py-24" id="portfolio">
            <div className="max-w-[1200px] mx-auto px-6">
                {/* Heading */}
                <div className="text-center max-w-[700px] mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900">
                        Projects That Help Businesses Succeed Online
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Explore some of the websites and digital experiences we've built for
                        startups and growing businesses.
                    </p>
                </div>

                {/* Projects grid */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className=" group bg-white rounded-xs overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                        >
                            {/* Project image */}
                            <div className="relative overflow-hidden aspect-[16/9]">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className=" w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                                    {project.description}
                                </p>
                                <p className="text-xs text-gray-500 mb-4">{project.tech}</p>
                                <a
                                    href={project.link}
                                    className=" inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                                >
                                    View Project
                                    <FiArrowRight className="text-xs" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-sm sm:text-base text-gray-700 mb-4">
                        Want a website like these for your business?
                    </p>
                    <button
                        className=" inline-flex items-center justify-center px-7 py-3.5 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-xs hover:bg-blue-700 transition-colors w-full sm:w-auto"
                    >
                        Start Your Project
                    </button>
                </div>
            </div>
        </section>
    );
}
export default Portfolio