import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-[1200px] mx-auto px-6">
                {/* Main footer grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-20">

                    {/* Column 1: Brand */}
                    <div>
                        <div className="text-2xl font-bold text-white mb-4">
                            Webentric
                            <span className="text-blue-400">.</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-6 max-w-[280px]">
                            Webentric builds modern, high-performance websites that help
                            businesses establish a strong online presence and grow digitally.
                        </p>
                        {/* Social icons */}

                        {/* Linkedin */}
                        <div className="flex items-center gap-4">
                            <a href="linkedin.com/company/webentric" className="group hover:text-blue-400 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            {/* instagram */}
                            <a href="https://www.instagram.com/webentric.in/" className="group hover:text-blue-400 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.44-.645 1.44-1.44c0-.796-.644-1.44-1.44-1.44z" />
                                </svg>
                            </a>

                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
                        <nav className="space-y-3">
                            <a href="#home" className="text-sm hover:text-blue-400 transition-colors block">Home</a>
                            <a href="#services" className="text-sm hover:text-blue-400 transition-colors block">Services</a>
                            <a href="/portfolio" className="text-sm hover:text-blue-400 transition-colors block">Portfolio</a>
                            <a href="#process" className="text-sm hover:text-blue-400 transition-colors block">How We Work</a>
                            <a href="/#testimonials" className="text-sm hover:text-blue-400 transition-colors block">Testimonials</a>
                            <a href="/contact" className="text-sm hover:text-blue-400 transition-colors block">Contact</a>
                        </nav>
                    </div>

                    {/* Column 3: Services */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Services</h3>
                        <nav className="space-y-3">
                            <a href="#" className="text-sm hover:text-blue-400 transition-colors block">Business Website Development</a>
                            <a href="#" className="text-sm hover:text-blue-400 transition-colors block">E-Commerce Development</a>
                            <a href="#" className="text-sm hover:text-blue-400 transition-colors block">Website Redesign</a>
                            <a href="#" className="text-sm hover:text-blue-400 transition-colors block">Landing Page Development</a>
                            <a href="#" className="text-sm hover:text-blue-400 transition-colors block">Website Maintenance</a>
                            <a href="#" className="text-sm hover:text-blue-400 transition-colors block">SEO Optimization</a>
                        </nav>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
                        <div className="space-y-4 mb-6">
                            <div>
                                <p className="text-sm mb-1">Phone:</p>
                                <a href="tel:+918851948143" className="text-sm hover:text-blue-400 transition-colors">+91 8851948143</a>
                            </div>
                            <div>
                                <p className="text-sm mb-1">Email:</p>
                                <a href="vn.nawal02@gmail.com" className="text-sm hover:text-blue-400 transition-colors">webentric2026@gmail.com</a>
                            </div>
                            <div>
                                <p className="text-sm mb-1">Location:</p>
                                <p className="text-sm">Delhi, India</p>
                            </div>
                        </div>
                        <a
                            href="https://wa.me/918851948143"
                            className=" inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white text-sm font-medium rounded-xs hover:bg-green-600 transition-colors shadow-sm"
                        >
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 my-10" />

                {/* Bottom row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                    <p>&copy; 2026 Webentric. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                        <a href="terms" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer
