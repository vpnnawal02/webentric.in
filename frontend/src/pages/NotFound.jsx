import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

const POPULAR = [
    { to: "/website-development", label: "Website Development" },
    { to: "/web-design", label: "Web Design" },
    { to: "/pricing", label: "Pricing" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/blogs", label: "Blogs" },
    { to: "/contact", label: "Contact" },
];

export default function NotFound() {
    return (
        <main className="min-h-screen bg-page text-ink flex items-center justify-center px-4">
            <SEO
                title="Page Not Found | Webentric"
                description="The page you are looking for does not exist. Explore Webentric's website development services in Delhi, India."
                robots="noindex, nofollow"
            />
            <div className="text-center max-w-xl py-20">
                <p className="text-sm tracking-[0.22em] text-muted mb-4">
                    404
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4">
                    This page went offline
                </h1>
                <p className="text-muted text-sm sm:text-base leading-relaxed mb-8">
                    The link may be broken or the page may have moved. Here are
                    some useful places to continue:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                    {POPULAR.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="text-xs sm:text-sm border border-line px-4 py-2 text-ink/80 hover:text-ink hover:border-edge transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <Link
                    to="/"
                    className="inline-flex px-7 py-3.5 bg-accent text-on-accent text-sm font-medium hover:bg-accent/85 transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
