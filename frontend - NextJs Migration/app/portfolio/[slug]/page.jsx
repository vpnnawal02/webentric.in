import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Check, MessageCircle, MapPin, Clock, Layers } from 'lucide-react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Faq from '../../../components/Faq';
import ServiceCTA from '../../../components/ServiceCTA';
import JsonLd from '../../../components/JsonLd';
import Reveal from '../../../components/Reveal';
import { SITE, webPageSchema, breadcrumbSchema, faqSchema, toAbsolute } from '../../../lib/seo';
import { PORTFOLIO_PROJECTS, getProject, getAdjacentProjects } from '../../../lib/portfolio-data';

export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: 'Project not found | Webentric' };
  const url = `${SITE.url}/portfolio/${p.slug}`;
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    keywords: p.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: p.seoTitle,
      description: p.seoDescription,
      url,
      type: 'article',
      images: [{ url: toAbsolute(p.cover), width: 1200, height: 630, alt: `${p.shortName} — website designed and developed by Webentric` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: p.seoTitle,
      description: p.seoDescription,
      images: [toAbsolute(p.cover)],
    },
  };
}

function ProjectCtaButtons({ p }) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8">
      {p.liveUrl ? (
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-on-accent text-sm font-medium hover:bg-accent/85 transition-colors"
        >
          View Live Website <ExternalLink size={15} />
        </a>
      ) : null}
      <Link
        href="/contact"
        className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium transition-colors ${
          p.liveUrl
            ? 'border border-edge text-ink hover:border-ink'
            : 'bg-accent text-on-accent hover:bg-accent/85'
        }`}
      >
        Start Your Project <ArrowRight size={15} />
      </Link>
      <a
        href="https://wa.me/message/IK7VVIWKOELZL1"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-edge text-sm text-ink hover:border-ink transition-colors"
      >
        <MessageCircle size={15} /> WhatsApp Us
      </a>
    </div>
  );
}

export default async function PortfolioDetailPage({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const related = PORTFOLIO_PROJECTS.filter((x) => x.slug !== slug && x.category === p.category)
    .concat(PORTFOLIO_PROJECTS.filter((x) => x.slug !== slug && x.category !== p.category))
    .slice(0, 3);

  const pageUrl = `${SITE.url}/portfolio/${p.slug}`;

  return (
    <main className="bg-page text-ink min-h-screen">
      <JsonLd
        data={[
          webPageSchema({ name: p.seoTitle, url: pageUrl, description: p.seoDescription }),
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: p.title,
            url: pageUrl,
            description: p.seoDescription,
            image: p.gallery.map((g) => toAbsolute(g)),
            creator: { '@id': `${SITE.url}/#organization` },
            keywords: p.keywords.join(', '),
          },
          breadcrumbSchema([
            { name: 'Home', url: SITE.url },
            { name: 'Portfolio', url: `${SITE.url}/portfolio` },
            { name: p.shortName, url: pageUrl },
          ]),
          faqSchema(p.faqs),
        ]}
      />

      <div className="max-w-[1600px] mx-auto md:px-20 px-5 pt-24 md:pt-28 pb-20">
        <Breadcrumbs items={[{ label: 'Portfolio', href: '/portfolio' }, { label: p.shortName }]} />

        {/* Header */}
        <p className="t-eyebrow mb-4">
          {p.category} · {p.location}
        </p>
        <h1 className="t-h1 mb-4">
          {p.title}
        </h1>
        <p className="text-muted text-base sm:text-lg leading-relaxed max-w-3xl mb-6">{p.tagline}</p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-muted mb-8">
          <span className="inline-flex items-center gap-1.5"><Layers size={14} /> {p.tech.join(' • ')}</span>
          <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {p.location}</span>
          <span className="inline-flex items-center gap-1.5"><Clock size={14} /> Delivered in {p.timeline}</span>
          <span>
            Industry:{' '}
            <Link href={p.industryLink} className="text-ink underline underline-offset-4 decoration-line hover:decoration-ink transition-colors">
              {p.industry}
            </Link>
          </span>
        </div>

        {/* Hero image */}
        <Reveal>
          <div className="bg-surface border border-edge overflow-hidden">
            <Image
              src={p.cover}
              alt={`${p.shortName} — website designed and developed by Webentric`}
              width={1200}
              height={750}
              priority
              className="w-full h-auto object-cover"
            />
            <div className="flex items-center gap-2 px-4 py-3 border-t border-line">
              <span className="w-2 h-2 rounded-full bg-edge" />
              <span className="w-2 h-2 rounded-full bg-edge" />
              <span className="w-2 h-2 rounded-full bg-edge" />
              <span className="t-micro ml-2 uppercase">{p.shortName} · by Webentric</span>
            </div>
          </div>
        </Reveal>

        <ProjectCtaButtons p={p} />

        {/* Overview */}
        <section className="mt-14 md:mt-20 max-w-3xl">
          <h2 className="t-h2 mb-6">Project overview</h2>
          <div className="space-y-4 t-body">
            {p.overview.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <p className="mt-6 t-small border-l-2 border-edge pl-4">
            Designed and developed by <Link href="/" className="text-ink underline underline-offset-4">Webentric — https://webentric.in</Link>,
            a website development company in Delhi, India. See our{' '}
            <Link href="/website-development" className="text-ink underline underline-offset-4">website development</Link>,{' '}
            <Link href="/web-design" className="text-ink underline underline-offset-4">web design</Link> and{' '}
            <Link href="/seo-services" className="text-ink underline underline-offset-4">SEO services</Link> for similar builds.
          </p>
        </section>

        {/* Gallery — uses every project image */}
        <section className="mt-14 md:mt-20">
          <h2 className="t-h2 mb-2">Design walkthrough</h2>
          <p className="text-sm text-muted mb-8 max-w-2xl">
            Every screen of the {p.shortName.toLowerCase()} website — {p.gallery.length} views covering homepage, inner sections and conversion flows.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {p.gallery.slice(1).map((src, i) => (
              <Reveal key={src} delay={(i % 2) * 80}>
                <figure className="bg-surface border border-line overflow-hidden group">
                  <Image
                    src={src}
                    alt={`${p.shortName} website screenshot ${i + 2} — designed by Webentric`}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  <figcaption className="px-4 py-3 text-xs text-muted border-t border-line">
                    Screen {i + 2} of {p.gallery.length} — {p.shortName} by Webentric
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* What we built */}
        <section className="mt-14 md:mt-20">
          <h2 className="t-h2 mb-8">What we built</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 md:sm:gap-6 sm:overflow-visible sm:pb-0 sm:snap-none">
            {p.features.map((f) => (
              <div key={f.title} className="min-w-[82%] snap-start shrink-0 bg-surface border border-line p-6 sm:min-w-0">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-on-accent mb-4">
                  <Check size={14} />
                </span>
                <h3 className="t-h3 mb-2">{f.title}</h3>
                <p className="t-small">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Business impact */}
        <section className="mt-14 md:mt-20 border-y border-line bg-surface/60 -mx-5 md:-mx-20 px-5 md:px-20 py-12 md:py-16">
          <p className="t-eyebrow mb-2">BUSINESS IMPACT</p>
          <h2 className="t-h2 mb-3">How this website helped the business</h2>
          <p className="text-sm text-muted max-w-2xl mb-8">
            Outcome highlights for a website of this type. Figures below are realistic illustrative estimates for this
            kind of build — <Link href="/contact" className="underline underline-offset-4">ask Webentric</Link> for details
            and a projection for your business.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {p.stats.map((s) => (
              <div key={s.label} className="bg-surface border border-line p-6">
                <p className="t-stat mb-2">{s.value}</p>
                <p className="font-medium text-sm mb-1">{s.label}</p>
                <p className="text-xs text-muted leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links / useful for */}
        <section className="mt-14 md:mt-20">
          <h2 className="t-h2 mb-6">Want a website like this?</h2>
          <p className="t-body max-w-3xl mb-6">
            Webentric builds fast, mobile-first websites for businesses across Delhi NCR and India. Start with our{' '}
            <Link href="/website-development" className="text-ink underline underline-offset-4">website development</Link>{' '}
            or <Link href="/web-design" className="text-ink underline underline-offset-4">web design</Link> services,
            add <Link href="/ecommerce-development" className="text-ink underline underline-offset-4">ecommerce</Link> or{' '}
            <Link href="/landing-page-development" className="text-ink underline underline-offset-4">landing pages</Link> as needed,
            and grow with <Link href="/seo-services" className="text-ink underline underline-offset-4">SEO services</Link> and{' '}
            <Link href="/website-maintenance" className="text-ink underline underline-offset-4">maintenance plans</Link>.
            Transparent costs at <Link href="/pricing" className="text-ink underline underline-offset-4">pricing</Link> and{' '}
            <Link href="/price-calculator" className="text-ink underline underline-offset-4">price calculator</Link> — or read
            client <Link href="/reviews" className="text-ink underline underline-offset-4">reviews</Link> first.
          </p>
          <ProjectCtaButtons p={p} />
        </section>

        <Faq items={p.faqs} />

        {/* Prev / Next */}
        <section className="mt-14 md:mt-20 grid sm:grid-cols-2 gap-3 md:gap-4">
          <Link href={`/portfolio/${prev.slug}`} className="block border border-line bg-surface p-5 hover:border-ink transition-colors">
            <span className="t-micro flex items-center gap-1"><ArrowLeft size={12} /> PREVIOUS</span>
            <span className="font-medium mt-1 block">{prev.shortName}</span>
          </Link>
          <Link href={`/portfolio/${next.slug}`} className="block border border-line bg-surface p-5 text-right hover:border-ink transition-colors">
            <span className="t-micro flex items-center gap-1 justify-end">NEXT <ArrowRight size={12} /></span>
            <span className="font-medium mt-1 block">{next.shortName}</span>
          </Link>
        </section>

        {/* Related */}
        <section className="mt-14 md:mt-20">
          <h2 className="t-h2 mb-6">More projects</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/portfolio/${r.slug}`} className="group bg-surface border border-edge overflow-hidden hover:border-ink transition-colors">
                <div className="overflow-hidden">
                  <Image
                    src={r.cover}
                    alt={`${r.shortName} — website by Webentric`}
                    width={480}
                    height={300}
                    loading="lazy"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <p className="t-micro mb-1">{r.category}</p>
                  <h3 className="t-h3 mb-2">{r.shortName}</h3>
                  <span className="text-sm inline-flex items-center gap-1">View case study <ArrowUpRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/portfolio"
            className="inline-block mt-6 text-sm text-ink underline underline-offset-4 decoration-line hover:decoration-ink transition-colors"
          >
            ← Back to all projects
          </Link>
        </section>

        <ServiceCTA
          title={`Want a website like ${p.shortName}?`}
          text="Tell us about your business and goals. Webentric replies within 24 hours on business days with a clear quote and timeline."
        />
      </div>
    </main>
  );
}
