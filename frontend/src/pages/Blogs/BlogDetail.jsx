import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import blogs from "./BlogData.js";

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
     * Basic dynamic SEO metadata.
     */
    useEffect(() => {
        if (!blog) return;

        const defaultTitle =
            `${blog.title} | Webentric`;

        const description =
            blog.metaDescription ||
            blog.content?.find(
                (block) => block.type === "paragraph"
            )?.text?.slice(0, 155) ||
            "Read the latest web development insights from Webentric.";

        /*
         * Title
         */
        document.title =
            blog.metaTitle || defaultTitle;

        /*
         * Meta Description
         */
        let metaDescription =
            document.querySelector(
                'meta[name="description"]'
            );

        if (!metaDescription) {
            metaDescription =
                document.createElement("meta");

            metaDescription.setAttribute(
                "name",
                "description"
            );

            document.head.appendChild(
                metaDescription
            );
        }

        metaDescription.setAttribute(
            "content",
            description
        );

        /*
         * Canonical
         */
        let canonical =
            document.querySelector(
                'link[rel="canonical"]'
            );

        if (!canonical) {
            canonical =
                document.createElement("link");

            canonical.setAttribute(
                "rel",
                "canonical"
            );

            document.head.appendChild(
                canonical
            );
        }

        canonical.setAttribute(
            "href",
            `https://webentric.in/blogs/${blog.slug}`
        );

    }, [blog]);

    /*
     * Blog not found
     */
    if (!blog) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
                <div className="text-center">

                    <p className="text-sm tracking-widest text-gray-500 mb-4">
                        404
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-medium mb-4">
                        Article not found
                    </h1>

                    <p className="text-gray-400 mb-8">
                        The article you're looking for doesn't exist.
                    </p>

                    <Link
                        to="/blogs"
                        className="inline-flex border border-white/30 px-6 py-3 text-sm hover:bg-white hover:text-black transition-colors"
                    >
                        Back to Blogs
                    </Link>

                </div>
            </main>
        );
    }

    return (
        <article className="min-h-screen bg-black text-white">

            {/* Article Header */}
            <header className="px-4 sm:px-8 md:px-16 lg:px-24 pt-5  md:pt-10">

                <div className="max-w-4xl mx-auto">

                    {/* Back Link */}
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors mb-10"
                    >
                        <span>←</span>

                        <span>
                            Back to Blogs
                        </span>
                    </Link>

                    {/* Category */}
                    <div className="mb-5">
                        <span className="text-[11px] sm:text-xs tracking-wide bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                            {blog.category}
                        </span>
                    </div>

                    {/* H1 */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-6">
                        {blog.title}
                    </h1>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-400 mb-10">

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

                    <div className="w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-neutral-900">

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
                                            className="text-2xl sm:text-3xl font-medium mt-12 mb-5 text-white leading-tight"
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
                                            className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6"
                                        >
                                            {block.text}
                                        </p>
                                    );
                                }

                                return null;
                            }
                        )}

                    </div>

                    {/* Bottom Divider */}
                    <div className="border-t border-white/10 mt-16 pt-10">

                        <Link
                            to="/blogs"
                            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            ← View all articles
                        </Link>

                    </div>

                </div>

            </div>

        </article>
    );
}