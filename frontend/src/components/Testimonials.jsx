import { useState, useEffect, useRef } from "react";
import { testimonials } from "../assets/data.js";
import PopUpForm from "./PopUpForm.jsx";

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [open, setOpen] = useState(false);

    const intervalRef = useRef(null);

    const startAutoPlay = () => {
        if (window.innerWidth < 1024) {
            stopAutoPlay();

            intervalRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % testimonials.length);
            }, 4500);
        }
    };

    const stopAutoPlay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        startAutoPlay();

        const handleResize = () => {
            stopAutoPlay();
            startAutoPlay();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            stopAutoPlay();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const renderStars = (rating) => {
        return Array(5)
            .fill(0)
            .map((_, index) => (
                <svg
                    key={index}
                    className={`h-4 w-4 fill-current ${index < rating ? "text-white" : "text-white/20"
                        }`}
                    viewBox="0 0 24 24"
                >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
            ));
    };

    const handleDotClick = (index) => {
        stopAutoPlay();
        setCurrentSlide(index);
        startAutoPlay();
    };

    return (
        <>
            <PopUpForm open={open} setOpen={setOpen} />

            <section
                id="testimonials"
                className="bg-black py-20 sm:py-24 lg:py-28 overflow-hidden text-white"
            >
                <div className="max-w-[1200px] mx-auto px-6">
                    {/* Heading */}
                    <div className="max-w-[760px] mx-auto text-center">
                        <p className="text-[20px] uppercase tracking-[0.22em] text-white/60 mb-4">
                            TESTIMONIALS
                        </p>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.04em] text-white leading-tight">
                            What Our Clients Say
                        </h2>

                        <p className="mt-4 text-base sm:text-lg text-white/55 leading-relaxed max-w-[620px] mx-auto">
                            Businesses trust Webentric to create websites that are
                            modern, fast, reliable, and built to support real online growth.
                        </p>
                    </div>

                    {/* Desktop Grid */}
                    <div className="hidden lg:grid grid-cols-3 gap-8 mt-16 auto-rows-fr">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="flex flex-col bg-white/[0.03] border border-white/20 p-7 lg:p-8 transition-colors duration-300 hover:bg-white/[0.05] hover:border-white/20 min-h-[320px]"
                            >
                                <div className="flex items-center mb-5">
                                    {renderStars(testimonial.rating)}
                                </div>

                                <blockquote className="text-white/72 leading-relaxed text-[15px] sm:text-base flex-1">
                                    &ldquo;{testimonial.text}&rdquo;
                                </blockquote>

                                <div className="mt-8 pt-5 border-t border-white/10">
                                    <p className="font-medium text-white text-base">
                                        {testimonial.name}
                                    </p>

                                    <p className="text-sm text-white/40 mt-1">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Carousel */}
                    <div
                        className="lg:hidden mt-14"
                        onMouseEnter={stopAutoPlay}
                        onMouseLeave={startAutoPlay}
                    >
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                style={{
                                    transform: `translateX(-${currentSlide * 100}%)`,
                                }}
                            >
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className="min-w-full px-1 sm:px-2"
                                    >
                                        <div className="flex flex-col w-full bg-white/[0.03] border border-white/10 p-6 sm:p-7 min-h-[300px]">
                                            <div className="flex items-center mb-5">
                                                {renderStars(testimonial.rating)}
                                            </div>

                                            <blockquote className="text-white/72 leading-relaxed text-[15px] sm:text-base flex-1">
                                                &ldquo;{testimonial.text}&rdquo;
                                            </blockquote>

                                            <div className="mt-8 pt-5 border-t border-white/10">
                                                <p className="font-medium text-white text-base sm:text-lg">
                                                    {testimonial.name}
                                                </p>

                                                <p className="text-sm text-white/40 mt-1">
                                                    {testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dots */}
                        <div className="flex items-center justify-center gap-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                    className={`h-[6px] rounded-full transition-all duration-300 ${index === currentSlide
                                        ? "w-10 bg-white"
                                        : "w-6 bg-white/20 hover:bg-white/35"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-20 text-center">
                        <p className="text-white/55 text-sm sm:text-base mb-6">
                            Ready to build your website?
                        </p>

                        <button
                            onClick={() => setOpen(true)}
                            className="inline-flex items-center justify-center bg-white text-black hover:bg-white/85 font-medium px-7 py-3.5 transition-colors w-full sm:w-auto"
                        >
                            Get a Free Website Quote
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Testimonials;