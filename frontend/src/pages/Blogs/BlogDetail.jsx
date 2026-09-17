import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import blogs from "./BlogData.js";
import BlogCard from "./BlogCard.jsx";
import SEO from "../../components/SEO.jsx";
import { SITE, toAbsolute, toISODate, articleSchema, breadcrumbSchema } from "../../utils/seoMeta.js";
import { getExcerpt } from "./blogUtils.js";

export default function BlogDetail() {
    const { slug } = useParams();

    const blog = blogs.find((item) => item.slug === slug);

    /*
     * Scroll to top whenever a new article opens.
     */
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
    }, [slug]);

    /*
     * Blog not found
     */
    if (!blog) {
        return (
            <main className="min-h-screen bg-page text-ink flex items-center justify-center px-4">
                <div className="text-center">

                    <p className="text-sm tracking-widest text-muted mb-4">
                        404
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-medium mb-4">
                        Article not found
                    </h1>

                    <p className="text-muted mb-8">
                        The article you're looking for doesn't exist.
                    </p>

                    <Link
                        to="/blogs"
                        className="inline-flex border border-edge px-6 py-3 text-sm hover:bg-accent hover:text-on-accent transition-colors"
                    >
                        Back to Blogs
                    </Link>

                </div>
            </main>
        );
    }

    const excerpt = getExcerpt(blog, 155);
    const isoDate = toISODate(blog.date);

    return (
        <article className="min-h-screen bg-page text-ink">
            <SEO
                title={blog.metaTitle || `${blog.title} | Webentric`}
                description={blog.metaDescription || excerpt}
                keywords={[...(blog.tags || []), "Webentric", "Delhi", "India"]}
                canonical={`${SITE.url}/blogs/${blog.slug}`}
                ogType="article"
                ogImage={toAbsolute(blog.coverImage)}
                article={{ publishedTime: isoDate, modifiedTime: isoDate, author: "Webentric", tags: blog.tags || [] }}
                schema={[articleSchema(blog, excerpt), breadcrumbSchema([{ name: "Home", url: SITE.url }, { name: "Blogs", url: `${SITE.url}/blogs` }, { name: blog.title, url: `${SITE.url}/blogs/${blog.slug}` }])]}
            />

            {/* Article Header */}
            <header className="px-4 sm:px-8 md:px-16 lg:px-24 pt-5  md:pt-10">

                <div className="max-w-4xl mx-auto">

                    {/* Back Link */}
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted hover:text-ink transition-colors mb-10"
                    >
                        <span>←</span>

                        <span>
                            Back to Blogs
                        </span>
                    </Link>

                    {/* Category */}
                    <div className="mb-5">
                        <span className="text-[11px] sm:text-xs tracking-wide bg-subtle px-3 py-1.5 rounded-full border border-line">
                            {blog.category}
                        </span>
                    </div>

                    {/* H1 */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-6">
                        {blog.title}
                    </h1>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted mb-10">

                        <span>
                            {blog.author}
                        </span>

                        <span>•</span>

                        <time>
                            {blog.date}
                        </time>

                        <span>•</span>

                        <span>
                            {blog.readTime}
                        </span>

                    </div>

                </div>

            </header>

            {/* Cover Image */}
            <div className="px-4 sm:px-8 md:px-16 lg:px-24">

                <div className="max-w-5xl mx-auto">

                    <div className="w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-subtle">

                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />

                    </div>

                </div>

            </div>

            {/* Article Content */}
            <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-12 md:py-20">

                <div className="max-w-3xl mx-auto">

                    <div className="prose prose-invert prose-lg max-w-none">

                        {blog.content.map(
                            (block, index) => {

                                if (
                                    block.type ===
                                    "heading"
                                ) {
                                    return (
                                        <h2
                                            key={index}
                                            className="text-2xl sm:text-3xl font-medium mt-12 mb-5 text-ink leading-tight"
                                        >
                                            {block.text}
                                        </h2>
                                    );
                                }

                                if (
                                    block.type ===
                                    "paragraph"
                                ) {
                                    return (
                                        <p
                                            key={index}
                                            className="text-ink/80 text-base sm:text-lg leading-relaxed mb-6"
                                        >
                                            {block.text}
                                        </p>
                                    );
                                }

                                if (
                                    block.type === "list" &&
                                    Array.isArray(block.items)
                                ) {
                                    return (
                                        <ul
                                            key={index}
                                            className="my-6 rounded-sm border border-line bg-surface px-5 py-5 sm:px-6 space-y-2.5"
                                        >
                                            {block.items.map((item, itemIndex) => (
                                                <li
                                                    key={itemIndex}
                                                    className="flex items-start gap-3 text-ink/80 text-base sm:text-lg leading-relaxed"
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className="mt-[0.55em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ink/60"
                                                    />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                }

                                return null;
                            }
                        )}

                    </div>

                    <div className="mt-14 md:mt-20 rounded-sm border border-line bg-surface px-6 py-7 sm:px-8">
                        <h2 className="text-lg sm:text-xl font-medium mb-2">Planning a website for your business?</h2>
                        <p className="text-sm text-muted leading-relaxed mb-5">Get a fast, SEO-friendly website designed for Indian businesses — priced transparently in rupees.</p>
                        <div className="flex flex-wrap gap-3">
                            <Link to="/contact" className="px-5 py-2.5 bg-accent text-on-accent text-sm font-medium hover:bg-accent/85 transition-colors">Get a free quote</Link>
                            <Link to="/price-calculator" className="px-5 py-2.5 border border-edge text-sm text-ink hover:border-ink transition-colors">Estimate your cost</Link>
                            <Link to="/pricing" className="px-5 py-2.5 border border-edge text-sm text-ink hover:border-ink transition-colors">See pricing</Link>
                        </div>
                    </div>

                    {/* Related articles */}
                    {blogs.filter(
                        (item) =>
                            item.slug !== blog.slug &&
                            item.category === blog.category
                    ).length > 0 && (
                        <section className="mt-14 md:mt-20">
                            <h2 className="text-xl sm:text-2xl font-medium mb-6">
                                Related articles
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {blogs
                                    .filter(
                                        (item) =>
                                            item.slug !== blog.slug &&
                                            item.category === blog.category
                                    )
                                    .slice(0, 2)
                                    .map((related) => (
                                        <BlogCard key={related.id} blog={related} />
                                    ))}
                            </div>
                        </section>
                    )}

                    {/* Bottom Divider */}
                    <div className="border-t border-line mt-16 pt-10">

                        <Link
                            to="/blogs"
                            className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
                        >
                            ← View all articles
                        </Link>

                    </div>

                </div>

            </div>

        </article>
    );
}