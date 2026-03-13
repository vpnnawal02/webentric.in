import { icons } from "./imgs/assets.js";

export const projects = [
    {
        title: "Restaurant Website",
        description:
            "Modern restaurant website featuring an interactive menu, online reservations, and mobile-friendly design.",
        tech: "React • Tailwind",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=450&fit=crop",
        link: ''
    },
    {
        title: "E-Commerce Store",
        description:
            "Custom online store with product listings, shopping cart functionality, and secure checkout integration.",
        tech: "React • Stripe • Firebase",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
        link: ''
    },
    {
        title: "Business Consulting Website",
        description:
            "Professional business website designed to showcase services and generate leads through optimized landing sections.",
        tech: "React • Tailwind",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop",
        link: ''
    },
    {
        title: "EdTech Platform Landing Page",
        description:
            "Modern landing page designed for an online education platform with clear call-to-actions and engaging visuals.",
        tech: "React • Tailwind",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop",
        link: ''
    },
    {
        title: "Gym & Fitness Website",
        description:
            "Responsive website for a fitness center including membership plans, trainer profiles, and class schedules.",
        tech: "React • Tailwind",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=450&fit=crop",
        link: ''
    },
    {
        title: "Real Estate Website",
        description:
            "Property listing website with advanced filtering, image galleries, and contact inquiry forms.",
        tech: "React • Tailwind",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop",
        link: ''
    },
];

export const services = [
    {
        icon: icons.globe_icon,
        title: "Business Website Development",
        description:
            "Professional websites designed to give businesses a strong online presence and showcase their services effectively.",
    },
    {
        icon: icons.cart_icon,
        title: "E-Commerce Development",
        description:
            "Custom online stores with secure payment integration, product management, and seamless shopping experiences.",
    },
    {
        icon: icons.refresh_icon,
        title: "Website Redesign",
        description:
            "Modern redesigns that improve usability, speed, and visual appeal for outdated websites.",
    },
    {
        icon: icons.target_icon,
        title: "Landing Page Development",
        description:
            "High-converting landing pages optimized for marketing campaigns, lead generation, and product launches.",
    },
    {
        icon: icons.refresh_icon,
        title: "Website Maintenance & Support",
        description:
            "Regular updates, security monitoring, and performance optimization to keep your website running smoothly.",
    },
    {
        icon: icons.target_icon,
        title: "SEO Optimization",
        description:
            "Technical SEO improvements that help your website rank higher on search engines and attract organic traffic.",
    },
];


export const processSteps = [
    {
        number: "01",
        icon: icons.message_circle_icon,
        title: "Project Consultation",
        description:
            "We begin by understanding your business, goals, and target audience to determine the best website strategy.",
    },
    {
        number: "02",
        icon: icons.layout_icon,
        title: "Wireframe & Design",
        description:
            "We design the structure and visual layout of your website to ensure a modern look and a seamless user experience.",
    },
    {
        number: "03",
        icon: icons.code_icon,
        title: "Website Development",
        description:
            "Your website is developed using modern technologies to ensure speed, responsiveness, and reliability.",
    },
    {
        number: "04",
        icon: icons.rocket_icon,
        title: "Launch & Optimization",
        description:
            "After thorough testing, we launch your website and ensure everything runs smoothly with ongoing improvements.",
    },
];


export const CONTACT_ITEMS = [
    {
        id: "phone",
        label: "Call",
        icon: icons.phone_icon,
        href: "tel:+918851948143",
        bg: "bg-emerald-500",
    },
    {
        id: "whatsapp",
        label: "WhatsApp",
        icon: icons.whatsapp_icon,
        href: "https://wa.me/918851948143",
        bg: "bg-green-500",
    },
    {
        id: "linkedin",
        label: "LinkedIn",
        icon: icons.linkedin_icon,
        href: "https://www.linkedin.com/in/your-profile", // change
        bg: "bg-sky-600",
    },
    {
        id: "facebook",
        label: "Facebook",
        icon: icons.facebook_icon,
        href: "https://www.facebook.com/your-page", // change
        bg: "bg-blue-600",
    },
    {
        id: "instagram",
        label: "Instagram",
        icon: icons.instagram_icon,
        href: "https://www.instagram.com/your-handle", // change
        bg: "bg-pink-500",
    },
];

export const testimonials = [
    {
        name: "Rahul Sharma",
        role: "Founder, Cafe Aroma",
        text: "The website Webentric built for our restaurant completely transformed our online presence. Customers can now easily find us and view our menu.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face",
        rating: 5,
    },
    {
        name: "Neha Verma",
        role: "Marketing Consultant",
        text: "The development process was smooth and professional. The final website exceeded our expectations and helped us generate more leads.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&h=48&fit=crop&crop=face",
        rating: 5,
    },
    {
        name: "Amit Mehta",
        role: "Startup Founder",
        text: "Highly recommended for businesses looking for modern, fast, and well-designed websites.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face",
        rating: 5,
    },
];

export const pricingPackages = [
    {
        title: "Starter Website",
        price: "₹7,999",
        delivery: "5–7 Days",
        features: [
            { name: "Up to 5 Pages", desc: "Home, About, Services, Portfolio, Contact pages included." },
            { name: "Mobile Responsive Design", desc: "Fully responsive across all devices and screen sizes." },
            { name: "Basic SEO Setup", desc: "Page titles, meta descriptions, and search indexing." },
            { name: "Contact Form", desc: "Professional form with email notifications and spam protection." },
            { name: "Fast Loading Pages", desc: "Optimized images, minified CSS/JS, performance best practices." },
        ],
    },
    {
        title: "Business Website",
        price: "₹14,999",
        delivery: "7–10 Days",
        popular: true,
        features: [
            { name: "Up to 10 Pages", desc: "Everything in Starter + Blog, Team, FAQ pages." },
            { name: "Custom Design", desc: "Unique design tailored to your brand identity." },
            { name: "Advanced UI/UX", desc: "Interactive elements, smooth animations, modern interactions." },
            { name: "SEO Optimized Structure", desc: "Complete on-page SEO, schema markup, sitemap." },
            { name: "Speed Optimization", desc: "Core Web Vitals, lazy loading, advanced caching." },
            { name: "Social Media Integration", desc: "Instagram, LinkedIn, WhatsApp, Facebook links." },
        ],
    },
    {
        title: "E-Commerce Website",
        price: "₹24,999",
        delivery: "10–14 Days",
        features: [
            { name: "Product Catalog", desc: "Unlimited products with categories and filtering." },
            { name: "Shopping Cart", desc: "Persistent cart, quantity controls, wishlist." },
            { name: "Payment Gateway", desc: "Razorpay, Stripe, UPI, PayPal integration." },
            { name: "Order Management", desc: "Order tracking, status updates, customer dashboard." },
            { name: "Mobile Store", desc: "Optimized e-commerce experience on all devices." },
            { name: "Admin Dashboard", desc: "Complete backend to manage products, orders, customers." },
        ],
    },
];

export const addons = [
    { name: "Extra Page", price: "₹500" },
    { name: "Blog Setup", price: "₹1,000" },
    { name: "SEO Optimization", price: "₹2,000" },
    { name: "Website Maintenance", price: "₹1,500/month" },
    { name: "Speed Optimization", price: "₹1,000" },
    { name: "Content Upload", price: "₹800" },
];

export const faqs = [
    {
        question: "How long does it take to build a website?",
        answer: "Most websites take 5–14 days depending on complexity. Starter packages deliver in 5–7 days, while e-commerce sites take 10–14 days.",
    },
    {
        question: "Do you provide hosting?",
        answer: "Yes! We help set up hosting with providers like Vercel, Netlify, or traditional hosting. Deployment and domain setup included.",
    },
    {
        question: "Will my website work on mobile devices?",
        answer: "Absolutely. All websites are fully responsive and optimized for phones, tablets, and desktops using modern responsive frameworks.",
    },
    {
        question: "Can I update my website later?",
        answer: "Yes! We provide documentation and training. Optional maintenance packages available for ongoing updates and support.",
    },
];