import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/*
 * Visual breadcrumb trail. Home is always first; pass the rest via items.
 * Example: <Breadcrumbs items={[{ label: "Services" }, { label: "Web Design", to: "/web-design" }]} />
 * (Non-linked crumbs render as plain text; the last crumb gets aria-current.)
 */
export default function Breadcrumbs({ items = [] }) {
    return (
        <nav aria-label="Breadcrumb" className="mb-8 md:mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] text-muted">
                <li>
                    <Link to="/" className="hover:text-ink transition-colors">
                        Home
                    </Link>
                </li>
                {items.map((item, i) => {
                    const last = i === items.length - 1;
                    return (
                        <li key={item.label} className="flex items-center gap-2">
                            <ChevronRight
                                size={12}
                                aria-hidden="true"
                                className="text-muted/60"
                            />
                            {item.to && !last ? (
                                <Link to={item.to} className="hover:text-ink transition-colors">
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    aria-current={last ? "page" : undefined}
                                    className={last ? "text-ink/80" : ""}
                                >
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
