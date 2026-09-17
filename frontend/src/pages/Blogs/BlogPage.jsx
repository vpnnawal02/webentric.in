import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import blogs from "./BlogData.js";
import BlogCard from "./BlogCard.jsx";
import SEO from "../../components/SEO.jsx";
import { SITE, blogSchema, breadcrumbSchema } from "../../utils/seoMeta.js";
import { blogMatchesQuery, getExcerpt, sortBlogs } from "./blogUtils.js";

const PAGE_SIZE = 6;

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [query, setQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");
    const [page, setPage] = useState(1);
    const gridTopRef = useRef(null);

    /* Categories derived from the data so pills never go stale. */
    const categories = useMemo(() => {
        const counts = new Map();
        blogs.forEach((blog) => {
            counts.set(blog.category, (counts.get(blog.category) || 0) + 1);
        });
        return [...counts.entries()];
    }, []);

    const isDefaultView =
        activeCategory === "All" && query.trim() === "" && sortOrder === "newest";

    const filteredBlogs = useMemo(() => {
        const q = query.trim();
        const matched = blogs.filter(
            (blog) =>
                (activeCategory === "All" || blog.category === activeCategory) &&
                blogMatchesQuery(blog, q)
        );
        return sortBlogs(matched, sortOrder);
    }, [activeCategory, query, sortOrder]);

    /* Newest article gets the spotlight; the grid shows the rest. */
    const featuredBlog = useMemo(
        () => (isDefaultView ? sortBlogs(blogs, "newest")[0] : null),
        [isDefaultView]
    );

    const gridBlogs = useMemo(() => {
        if (!featuredBlog) return filteredBlogs;
        return filteredBlogs.filter((blog) => blog.slug !== featuredBlog.slug);
    }, [filteredBlogs, featuredBlog]);

    const totalPages = Math.max(1, Math.ceil(gridBlogs.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const visibleBlogs = gridBlogs.slice(
        (safePage - 1) * PAGE_SIZE,
        safePage * PAGE_SIZE
    );

    const scrollToGrid = () => {
        gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const goToPage = (next) => {
        setPage(Math.min(Math.max(1, next), totalPages));
        scrollToGrid();
    };

    const resetPage = () => setPage(1);

    const clearAll = () => {
        setQuery("");
        setActiveCategory("All");
        setSortOrder("newest");
        setPage(1);
    };

    return (
        <section className="min-h-screen bg-page text-ink px-4 sm:px-8 md:px-16 lg:px-24 pt-28 pb-20">
            <SEO
                title="Web Design & Development Blog India | Webentric"
                description="Practical guides on website cost, design, SEO & maintenance for Indian businesses — from a website development company in Delhi."
                keywords={["website cost India", "web design blog India", "website maintenance tips", "small business website guide Delhi"]}
                canonical={`${SITE.url}/blogs`}
                schema={[blogSchema({ name: "Webentric Blog — Web Design & Development Insights", url: `${SITE.url}/blogs`, description: "Guides on website design, cost, SEO and maintenance for businesses in India.", posts: blogs }), breadcrumbSchema([{ name: "Home", url: SITE.url }, { name: "Blogs", url: `${SITE.url}/blogs` }])]}
            />
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <p className="text-xs sm:text-sm tracking-widest text-muted mb-3">
                    INSIGHTS &amp; ARTICLES
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 max-w-2xl leading-tight">
                    Thoughts on Design, Development &amp; Growth
                </h1>
                <p className="text-sm md:text-base text-ink/58 max-w-2xl leading-relaxed mb-8 md:mb-10">Practical guides on website design, cost, SEO and maintenance — written for businesses in Delhi &amp; across India.</p>

                {/* Search + sort */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5 md:mb-6">
                    <div className="relative flex-1">
                        <Search
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                        />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                resetPage();
                            }}
                            placeholder="Search articles, topics, tags…"
                            aria-label="Search articles"
                            className="w-full bg-surface border border-line text-ink text-sm placeholder:text-muted/70 pl-10 pr-10 py-2.5 outline-none transition-colors focus:border-ink/50 [&::-webkit-search-cancel-button]:hidden"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => {
                                    setQuery("");
                                    resetPage();
                                }}
                                aria-label="Clear search"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <div
                        role="group"
                        aria-label="Sort articles"
                        className="flex border border-line self-start"
                    >
                        {[
                            { value: "newest", label: "Newest" },
                            { value: "oldest", label: "Oldest" },
                        ].map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    setSortOrder(option.value);
                                    resetPage();
                                }}
                                aria-pressed={sortOrder === option.value}
                                className={`px-4 py-2.5 text-xs sm:text-sm tracking-wide transition-colors ${
                                    sortOrder === option.value
                                        ? "bg-accent text-on-accent font-medium"
                                        : "text-muted hover:text-ink"
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category filter */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 md:mb-8">
                    {[{ name: "All", count: blogs.length }, ...categories.map(([name, count]) => ({ name, count }))].map(
                        ({ name, count }) => (
                            <button
                                key={name}
                                onClick={() => {
                                    setActiveCategory(name);
                                    resetPage();
                                }}
                                aria-pressed={activeCategory === name}
                                className={`
                                    text-[11px] sm:text-xs
                                    tracking-wide
                                    px-3 sm:px-4
                                    py-1.5 sm:py-2
                                    rounded-full
                                    border
                                    transition-colors
                                    duration-200
                                    ${activeCategory === name
                                        ? "bg-accent text-on-accent border-accent"
                                        : "bg-transparent text-ink/80 border-edge hover:border-ink hover:text-ink"
                                    }
                                `}
                            >
                                {name === "All" ? "ALL" : name}
                                <span className={activeCategory === name ? "opacity-70" : "text-muted"}>
                                    {" "}({count})
                                </span>
                            </button>
                        )
                    )}
                </div>

                {/* Featured article */}
                {featuredBlog && (
                    <div className="mb-12 md:mb-16">
                        <p className="text-xs sm:text-sm tracking-widest text-muted mb-4">
                            LATEST ARTICLE
                        </p>
                        <Link
                            to={`/blogs/${featuredBlog.slug}`}
                            className="group grid md:grid-cols-5 bg-surface border border-line hover:border-edge transition-colors overflow-hidden"
                        >
                            <div className="md:col-span-3 aspect-[16/10] md:aspect-auto md:min-h-[320px] overflow-hidden bg-subtle">
                                <img
                                    src={featuredBlog.coverImage}
                                    alt={featuredBlog.title}
                                    loading="eager"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="md:col-span-2 p-6 sm:p-8 flex flex-col">
                                <span className="self-start text-[10px] sm:text-[11px] tracking-wide text-white bg-black/70 px-2.5 py-1 rounded-full border border-white/10 mb-4">
                                    {featuredBlog.category}
                                </span>
                                <h2 className="text-xl sm:text-2xl md:text-[1.7rem] font-medium leading-snug mb-3">
                                    {featuredBlog.title}
                                </h2>
                                <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-5">
                                    {getExcerpt(featuredBlog, 180)}
                                </p>
                                <div className="mt-auto flex items-center gap-2 text-[11px] sm:text-xs text-muted">
                                    <span>{featuredBlog.date}</span>
                                    <span>•</span>
                                    <span>{featuredBlog.readTime}</span>
                                </div>
                                <span className="mt-3 text-xs sm:text-sm inline-flex items-center gap-1 text-ink/80 group-hover:text-ink group-hover:gap-2 transition-all">
                                    Read article
                                    <span aria-hidden>→</span>
                                </span>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Result count */}
                <div ref={gridTopRef} className="scroll-mt-24 flex items-center justify-between mb-6">
                    <p className="text-xs sm:text-sm text-muted">
                        {gridBlogs.length === 0
                            ? "No articles found"
                            : `Showing ${visibleBlogs.length} of ${gridBlogs.length} article${gridBlogs.length === 1 ? "" : "s"}`}
                    </p>
                    {!isDefaultView && gridBlogs.length > 0 && (
                        <button
                            type="button"
                            onClick={clearAll}
                            className="text-xs sm:text-sm text-muted hover:text-ink underline underline-offset-4 transition-colors"
                        >
                            Clear filters
                        </button>
                    )}
                </div>

                {/* Blog grid */}
                {visibleBlogs.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {visibleBlogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {gridBlogs.length === 0 && (
                    <div className="border border-line bg-surface px-6 py-14 text-center">
                        <p className="text-ink font-medium mb-2">No articles match your search</p>
                        <p className="text-muted text-sm mb-6">
                            Try a different keyword or browse another category.
                        </p>
                        <button
                            type="button"
                            onClick={clearAll}
                            className="px-6 py-2.5 bg-accent text-on-accent text-sm font-medium hover:bg-accent/85 transition-colors"
                        >
                            Clear search &amp; filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <nav aria-label="Blog pages" className="mt-12 flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => goToPage(safePage - 1)}
                            disabled={safePage === 1}
                            className="h-10 px-4 border border-line text-sm text-muted hover:text-ink hover:border-edge transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-line disabled:hover:text-muted"
                        >
                            ← Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                            <button
                                key={n}
                                type="button"
                                onClick={() => goToPage(n)}
                                aria-label={`Go to page ${n}`}
                                aria-current={n === safePage ? "page" : undefined}
                                className={`min-w-10 h-10 px-3 border text-sm transition-colors ${
                                    n === safePage
                                        ? "bg-accent text-on-accent border-accent font-medium"
                                        : "border-line text-muted hover:text-ink hover:border-edge"
                                }`}
                            >
                                {n}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => goToPage(safePage + 1)}
                            disabled={safePage === totalPages}
                            className="h-10 px-4 border border-line text-sm text-muted hover:text-ink hover:border-edge transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-line disabled:hover:text-muted"
                        >
                            Next →
                        </button>
                    </nav>
                )}
            </div>
        </section>
    );
}
