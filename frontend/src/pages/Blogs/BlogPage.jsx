import { useState } from "react";
import blogs from "./BlogData.js";
import BlogCard from "./BlogCard.jsx";

const CATEGORIES = [
    "ALL",
    "WEB DEVELOPMENT",
    "UX/UI DESIGN",
    "BRAND IDENTITY",
];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("ALL");

    const filteredBlogs =
        activeCategory === "ALL"
            ? blogs
            : blogs.filter((blog) => blog.tags.includes(activeCategory));

    return (
        <section className="min-h-screen bg-page text-ink px-4 sm:px-8 md:px-16 lg:px-24 pt-28 pb-20">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <p className="text-xs sm:text-sm tracking-widest text-muted mb-3">
                    INSIGHTS &amp; ARTICLES
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-8 md:mb-12 max-w-2xl leading-tight">
                    Thoughts on Design, Development &amp; Growth
                </h1>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 md:mb-14">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`
                                text-[11px] sm:text-xs
                                tracking-wide
                                px-3 sm:px-4
                                py-1.5 sm:py-2
                                rounded-full
                                border
                                transition-colors
                                duration-200
                                ${activeCategory === cat
                                    ? "bg-accent text-on-accent border-accent"
                                    : "bg-transparent text-ink/80 border-edge hover:border-ink hover:text-ink"
                                }
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {filteredBlogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            blog={blog}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredBlogs.length === 0 && (
                    <p className="text-muted mt-10 text-sm">
                        No articles found in this category yet.
                    </p>
                )}
            </div>
        </section>
    );
}