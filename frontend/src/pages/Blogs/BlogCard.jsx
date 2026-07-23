import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
    return (
        <article className="group bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col">

            {/* Image */}
            <Link
                to={`/blogs/${blog.slug}`}
                className="relative block w-full aspect-[4/3] overflow-hidden bg-neutral-800"
            >
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute top-3 left-3 text-[10px] sm:text-[11px] tracking-wide bg-black/70 backdrop-blur px-2.5 py-1 rounded-full border border-white/10">
                    {blog.category}
                </span>
            </Link>

            {/* Content */}
            <div className="p-4 sm:p-5 flex flex-col flex-1">

                {/* Meta */}
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-500 mb-2">
                    <span>{blog.date}</span>

                    <span>•</span>

                    <span>{blog.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-base sm:text-lg font-medium mb-4 leading-snug">
                    <Link
                        to={`/blogs/${blog.slug}`}
                        className="hover:underline"
                    >
                        {blog.title}
                    </Link>
                </h2>

                {/* Read Article */}
                <Link
                    to={`/blogs/${blog.slug}`}
                    className="mt-auto text-xs sm:text-sm inline-flex items-center gap-1 text-white/80 hover:text-white"
                >
                    Read article

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </Link>
            </div>
        </article>
    );
}