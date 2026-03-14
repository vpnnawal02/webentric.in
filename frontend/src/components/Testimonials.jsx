import { useState, useRef, useEffect } from "react";
import { testimonials } from '../assets/data.js';


const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const containerRef = useRef(null);

    // Auto-advance on mobile
    useEffect(() => {
        let interval;
        if (window.innerWidth < 1024) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % testimonials.length);
            }, 4000);
        }
        return () => clearInterval(interval);
    }, []);

    const renderStars = (rating) => {
        return Array(5)
            .fill(0)
            .map((_, i) => (
                <svg
                    key={i}
                    className="h-4 w-4 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
            ));
    };

    return (
        <section className="bg-gray-50 py-5" id="testimonials">
            <div className="max-w-[1200px] mx-auto px-6">
                {/* Heading */}
                <div className="text-center max-w-[700px] mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900">
                        What Our Clients Say
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Businesses trust Webentric to build websites that are modern, fast,
                        and designed to help them grow online.
                    </p>
                </div>

                {/* Desktop: 3-column grid */}
                <div className="hidden lg:grid grid-cols-3 gap-8 mt-16">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className=" group bg-white rounded-xs p-6 shadow-sm border border-gray-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/50 transition-all duration-300"
                        >
                            <div className="flex items-center mb-4">
                                {renderStars(testimonial.rating)}
                            </div>
                            <blockquote className="text-gray-700 leading-relaxed mb-6 text-[16px]">
                                &ldquo;{testimonial.text}&rdquo;
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile: Sliding carousel */}
                <div className="lg:hidden mt-16 overflow-hidden">
                    <div
                        ref={containerRef}
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="min-w-full px-4">
                                <div className="bg-white rounded-xs p-8 shadow-lg border border-gray-100">
                                    <div className="flex items-center mb-6">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <blockquote className="text-gray-700 leading-relaxed mb-8 text-[16px]">
                                        &ldquo;{testimonial.text}&rdquo;
                                    </blockquote>
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="h-14 w-14 rounded-full object-cover ring-2 ring-gray-100"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-900 text-lg">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots navigation */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`
                  h-3 w-3 rounded-full transition-all duration-300
                  ${index === currentSlide ? 'bg-blue-600 scale-125 shadow-md' : 'bg-gray-300 hover:bg-gray-400'}
                `}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Counter */}
                    <div className="text-center mt-4 text-sm text-gray-500">
                        {currentSlide + 1} / {testimonials.length}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 text-center">
                    <p className="text-sm sm:text-base text-gray-700 mb-6">
                        Ready to build your website?
                    </p>
                    <button
                        className=" inline-flex items-center justify-center px-7 py-3.5 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-xs hover:bg-blue-700 transition-colors w-full sm:w-auto"
                    >
                        Get a Free Website Quote
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Testimonials
