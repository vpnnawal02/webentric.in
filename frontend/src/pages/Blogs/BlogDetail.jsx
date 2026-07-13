import { motion } from "framer-motion";
import { useEffect } from "react";

export default function BlogDetail({ blog, onClose }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-start sm:items-center justify-center overflow-y-auto px-4 py-10 sm:py-16"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 40, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-neutral-950 border border-neutral-800 w-full max-w-3xl max-h-[85vh] overflow-y-auto"
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 h-9 w-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="w-full aspect-[16/9] bg-neutral-800 overflow-hidden ">
                    <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-5 sm:p-8 md:p-10">
                    <span className="text-[11px] sm:text-xs tracking-wide bg-white/10 px-2.5 py-1 rounded-full">
                        {blog.category}
                    </span>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mt-4 mb-3 leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-8">
                        <span>{blog.author}</span>
                        <span>&bull;</span>
                        <span>{blog.date}</span>
                        <span>&bull;</span>
                        <span>{blog.readTime}</span>
                    </div>

                    <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
                        {blog.content.map((block, idx) =>
                            block.type === "heading" ? (
                                <h2 key={idx} className="text-lg sm:text-xl md:text-2xl font-medium mt-6 mb-3 text-white">
                                    {block.text}
                                </h2>
                            ) : (
                                <p key={idx} className="text-gray-300 leading-relaxed mb-4">
                                    {block.text}
                                </p>
                            )
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}