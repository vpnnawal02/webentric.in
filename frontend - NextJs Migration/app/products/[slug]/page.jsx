import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Check, ArrowRight, ArrowLeft, ArrowUpRight, MessageCircle, Star } from 'lucide-react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Faq from '../../../components/Faq';
import ServiceCTA from '../../../components/ServiceCTA';
import JsonLd from '../../../components/JsonLd';
import Reveal from '../../../components/Reveal';
import { SITE, webPageSchema, breadcrumbSchema, serviceSchema, faqSchema } from '../../../lib/seo';
import { PRODUCTS, getProduct } from '../../../lib/products-data';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: 'Product not found | Webentric' };
  return {
    title: `${p.name} — Features, Benefits & Pricing in India | Webentric`,
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: `${SITE.url}/products/${p.slug}` },
    openGraph: {
      title: `${p.name} | Webentric Products`,
      description: p.description,
      url: `${SITE.url}/products/${p.slug}`,
      type: 'website',
      images: [`${SITE.url}${p.image}`],
    },
    twitter: { card: 'summary_large_image', title: `${p.name} | Webentric`, description: p.description, images: [`${SITE.url}${p.image}`] },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const idx = PRODUCTS.findIndex((x) => x.slug === slug);
  const prev = PRODUCTS[(idx - 1 + PRODUCTS.length) % PRODUCTS.length];
  const next = PRODUCTS[(idx + 1) % PRODUCTS.length];
  const related = PRODUCTS.filter((x) => x.slug !== slug && x.category === p.category).concat(PRODUCTS.filter((x) => x.slug !== slug && x.category !== p.category)).slice(0, 3);

  return (
    <main className="bg-page text-ink min-h-screen overflow-x-clip">
      <JsonLd
        data={[
          webPageSchema({ name: `${p.name} | Webentric`, url: `${SITE.url}/products/${p.slug}`, description: p.description }),
          serviceSchema({ name: p.name, url: `${SITE.url}/products/${p.slug}`, description: p.description, serviceType: p.category }),
          faqSchema(p.faqs),
          breadcrumbSchema([
            { name: 'Home', url: SITE.url },
            { name: 'Products', url: `${SITE.url}/products` },
            { name: p.name, url: `${SITE.url}/products/${p.slug}` },
          ]),
        ]}
      />

      {/* HERO */}
      <section className="relative px-4 sm:px-8 pt-16 pb-10" style={{ '--pf-accent': p.accent }}>
        <div className="pf-orb pf-orb-a" aria-hidden />
        <div className="pf-grid-bg" aria-hidden />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-6">
            <div>
              <Reveal delay={70}>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight leading-[1.03] mb-4">{p.name}</h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="text-lg sm:text-xl mb-4" style={{ color: p.accent }}>{p.tagline}</p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-muted text-[15px] sm:text-base leading-relaxed mb-7 max-w-xl">{p.description}</p>
              </Reveal>
              <Reveal delay={260}>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="pf-btn-primary">Get live demo <ArrowRight size={16} /></Link>
                  <a href="https://wa.me/message/IK7VVIWKOELZL1" target="_blank" rel="noopener noreferrer" className="pf-btn-ghost"><MessageCircle size={16} /> WhatsApp us</a>
                </div>
              </Reveal>
              <Reveal delay={320}>
                <div className="flex items-center gap-2 mt-6 text-xs text-muted">
                  <span className="flex text-ink" aria-label="Rated 4.9 out of 5">{[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}</span>
                  Built for Indian businesses · Live in 1–3 weeks · Training included
                </div>
              </Reveal>
            </div>
            <Reveal delay={150} y={40}>
              <div className="pf-hero-img">
                <Image src={p.image} alt={`${p.name} dashboard — ${p.tagline}`} width={900} height={600} className="w-full h-64 sm:h-80 lg:h-[380px] object-cover" priority />
                <div className="pf-hero-img-bar">
                  <span className="pf-dot" /><span className="pf-dot" /><span className="pf-dot" />
                  <span className="text-[11px] tracking-[0.18em] text-muted ml-2">{p.shortName} · LIVE PREVIEW</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT IT DOES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <Reveal><h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-5">What this {p.shortName.toLowerCase().includes('os') ? 'system' : 'software'} does</h2></Reveal>
            {p.intro.map((t, i) => (
              <Reveal key={i} delay={i * 70}><p className="text-muted text-[15px] sm:text-base leading-relaxed mb-4">{t}</p></Reveal>
            ))}
            <Reveal delay={120}>
              <div className="pf-note">
                <strong>Bottom line:</strong> fewer registers, fewer missed payments, fewer unhappy customers — and a dashboard that shows your whole business at a glance.
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-2">
            <Reveal delay={100}>
              <div className="pf-toc">
                <p className="text-xs tracking-[0.2em] text-muted mb-4">ON THIS PAGE</p>
                {[['#features', `All ${p.features.length} features`], ['#benefits', 'How it helps you'], ['#faq', 'FAQs'], ['#related', 'More products']].map(([href, label]) => (
                  <a key={href} href={href} className="pf-toc-link">{label} <ArrowUpRight size={14} /></a>
                ))}
                <Link href="/contact" className="pf-btn-primary mt-4 justify-center">Get pricing <ArrowRight size={16} /></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-8 pb-12 md:pb-16 scroll-mt-24">
        <Reveal><p className="text-xs tracking-[0.22em] text-muted mb-2">EVERYTHING INCLUDED</p></Reveal>
        <Reveal delay={60}><h2 className="text-2xl sm:text-4xl font-medium tracking-tight mb-3">All {p.features.length} modules, one login</h2></Reveal>
        <Reveal delay={120}><p className="text-muted text-sm sm:text-base max-w-2xl mb-8">Every module below is included — no hidden add-ons. We configure naming, pricing and roles to match your business during setup.</p></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {p.features.map((f, i) => (
            <Reveal key={f} delay={(i % 3) * 60}>
              <div className="pf-feature">
                <span className="pf-check"><Check size={14} /></span>
                <div>
                  <p className="font-medium text-sm leading-snug">{f}</p>
                  <p className="text-[11px] text-muted mt-0.5">Module {String(i + 1).padStart(2, '0')}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="border-y border-line bg-surface/60 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 md:py-16">
          <Reveal><p className="text-xs tracking-[0.22em] text-muted mb-2">WHY CLIENTS LOVE IT</p></Reveal>
          <Reveal delay={60}><h2 className="text-2xl sm:text-4xl font-medium tracking-tight mb-8">How it helps your business grow</h2></Reveal>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {p.benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 90}>
                <article className="pf-benefit" style={{ '--pf-accent': p.accent }}>
                  <p className="pf-benefit-n">0{i + 1}</p>
                  <h3 className="font-medium text-lg mb-2">{b.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{b.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <div id="faq" className="max-w-6xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 scroll-mt-24">
        <Faq items={p.faqs} />
      </div>

      {/* PREV / NEXT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-6">
        <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
          <Link href={`/products/${prev.slug}`} className="pf-pn">
            <span className="text-[11px] tracking-[0.2em] text-muted flex items-center gap-1"><ArrowLeft size={12} /> PREVIOUS</span>
            <span className="font-medium mt-1">{prev.name}</span>
          </Link>
          <Link href={`/products/${next.slug}`} className="pf-pn text-right">
            <span className="text-[11px] tracking-[0.2em] text-muted flex items-center gap-1 justify-end">NEXT <ArrowRight size={12} /></span>
            <span className="font-medium mt-1">{next.name}</span>
          </Link>
        </div>
      </section>

      {/* RELATED */}
      <section id="related" className="max-w-6xl mx-auto px-4 sm:px-8 pb-14 scroll-mt-24">
        <Reveal><h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6">You may also need</h2></Reveal>
        <div className="grid sm:grid-cols-3 gap-4">
          {related.map((r) => (
            <Link key={r.slug} href={`/products/${r.slug}`} className="pf-card group">
              <div className="pf-card-img">
                <Image src={r.image} alt={r.name} width={480} height={300} className="w-full h-36 object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-medium mb-1">{r.name}</h3>
                <p className="text-xs text-muted mb-3">{r.tagline}</p>
                <span className="pf-card-link text-sm">View <ArrowUpRight size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
        <ServiceCTA
          title={`Want ${p.name} with your branding?`}
          text="Tell us your business size and branches. We configure the system, migrate your existing data and train your team — reply within 24 hours on business days."
        />
      </section>
    </main>
  );
}
