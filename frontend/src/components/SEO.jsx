import { Helmet } from 'react-helmet-async';
import { SITE } from '../utils/seoMeta.js';

/*
 * Central SEO head manager. Every public route renders this with
 * page-specific copy; crawlers get title, description, canonical,
 * geo (Delhi/IN), Open Graph, Twitter and JSON-LD structured data.
 */
export default function SEO({
    title,
    description,
    keywords = [],
    canonical = '',
    robots = 'index, follow',
    ogType = 'website',
    ogImage = `${SITE.url}/social-media-cover.png`,
    twitterCard = 'summary_large_image',
    article = null,
    schema = [],
}) {
    const url = canonical || SITE.url;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords.length > 0 && (
                <meta name="keywords" content={keywords.join(', ')} />
            )}
            <meta name="robots" content={robots} />
            <link rel="canonical" href={url} />

            {/* Local SEO — New Delhi, India */}
            <meta name="geo.region" content="IN-DL" />
            <meta name="geo.placename" content="New Delhi" />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content={SITE.name} />
            <meta property="og:locale" content={SITE.locale} />

            {/* Twitter */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Article metadata */}
            {article && (
                <>
                    {article.publishedTime && (
                        <meta
                            property="article:published_time"
                            content={article.publishedTime}
                        />
                    )}
                    {article.modifiedTime && (
                        <meta
                            property="article:modified_time"
                            content={article.modifiedTime}
                        />
                    )}
                    {article.author && (
                        <meta property="article:author" content={article.author} />
                    )}
                    {(article.tags || []).map((tag) => (
                        <meta key={tag} property="article:tag" content={tag} />
                    ))}
                </>
            )}

            {/* Structured data */}
            {schema.map((node, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(node)}
                </script>
            ))}
        </Helmet>
    );
}
