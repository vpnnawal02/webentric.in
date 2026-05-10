import { useState, useEffect, useRef } from "react";
import { testimonials } from "../assets/data.js";
import PopUpForm from "./PopUpForm.jsx";

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [open, setOpen] = useState(false);

    const intervalRef = useRef(null);

    // ================= AUTOPLAY =================

    const startAutoPlay = () => {
        if (window.innerWidth < 1024) {
            stopAutoPlay();

            intervalRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % testimonials.length);
            }, 4000);
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

        return () => {
            stopAutoPlay();
        };
    }, []);

    // ================= STARS =================

    const renderStars = (rating) => {
        return Array(5)
            .fill(0)
            .map((_, index) => (
                <svg
                    key={index}
                    className={`h-4 w-4 fill-current ${index < rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                        }`}
                    viewBox="0 0 24 24"
                >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
            ));
    };

    // ================= DOT CLICK =================

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
                className="bg-gray-50 py-16 overflow-hidden"
            >
                <div className="max-w-[1200px] mx-auto px-6">

                    {/* ================= HEADING ================= */}

                    <div className="max-w-[700px] mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                            What Our Clients Say
                        </h2>

                        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                            Businesses trust Webentric to build websites
                            that are modern, fast, and designed to help
                            them grow online.
                        </p>
                    </div>

                    {/* ================= DESKTOP GRID ================= */}

                    <div className="hidden lg:grid grid-cols-3 gap-8 mt-16 auto-rows-fr">

                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="flex flex-col h-min bg-white border border-gray-200 rounded-sm p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/40"
                            >

                                {/* Stars */}
                                <div className="flex items-center mb-5">
                                    {renderStars(testimonial.rating)}
                                </div>

                                {/* Testimonial */}
                                <blockquote className="text-gray-700 leading-relaxed text-base flex-1">
                                    &ldquo;{testimonial.text}&rdquo;
                                </blockquote>

                                {/* Footer */}
                                <div className="mt-8 pt-5 border-t border-gray-100">
                                    <p className="font-semibold text-gray-900">
                                        {testimonial.name}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {testimonial.role}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* ================= MOBILE CAROUSEL ================= */}

                    <div
                        className="lg:hidden mt-14 h-min"
                        onMouseEnter={stopAutoPlay}
                        onMouseLeave={startAutoPlay}
                    >

                        {/* Slider Wrapper */}
                        <div className="overflow-hidden h-min">

                            {/* Slider */}
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(-${currentSlide * 100}%)`,
                                }}
                            >

                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className="min-w-full px-2 flex max-h-[40vh] overflow-scroll"
                                    >

                                        {/* Card */}
                                        <div className="flex flex-col w-full h-min bg-white border border-gray-200 rounded-sm p-7 shadow-md">

                                            {/* Stars */}
                                            <div className="flex items-center mb-5">
                                                {renderStars(testimonial.rating)}
                                            </div>

                                            {/* Testimonial */}
                                            <blockquote className="text-gray-700 leading-relaxed text-base flex-1">
                                                &ldquo;{testimonial.text}&rdquo;
                                            </blockquote>

                                            {/* Footer */}
                                            <div className="mt-8 pt-5 border-t border-gray-100">
                                                <p className="font-semibold text-gray-900 text-lg">
                                                    {testimonial.name}
                                                </p>

                                                <p className="text-sm text-gray-500 mt-1">
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
                                    className={`h-3 w-3 rounded-full transition-all duration-300 ${index === currentSlide
                                        ? "bg-blue-600 scale-125"
                                        : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                />
                            ))}
                        </div>

                    </div>

                    {/* ================= CTA ================= */}

                    <div className="mt-20 text-center">

                        <p className="text-gray-700 text-sm sm:text-base mb-6">
                            Ready to build your website?
                        </p>

                        <button
                            onClick={() => setOpen(true)}
                            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-sm transition-colors w-full sm:w-auto"
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