import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Sparkles, Zap, ShieldCheck, Rocket } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import Faq from '../../components/Faq';
import ServiceCTA from '../../components/ServiceCTA';
import JsonLd from '../../components/JsonLd';
import Reveal from '../../components/Reveal';
import { SITE, webPageSchema, breadcrumbSchema, itemListSchema, faqSchema } from '../../lib/seo';
import { PRODUCTS } from '../../lib/products-data';

const DESCRIPTION =
  'Explore 12 ready-to-deploy Webentric products — gym, clinic, school, coaching, salon, retail, restaurant, PG, billing, inventory, sports & AI support software. Live in weeks, SEO-friendly, built for Indian businesses.';

export const metadata = {
  title: 'Products — Ready-to-Deploy Business Software | Webentric',
  description: DESCRIPTION,
  keywords: ['business software products India', 'gym management software', 'clinic management software', 'school ERP software', 'salon software', 'restaurant POS', 'AI chatbot software'],
  alternates: { canonical: `${SITE.url}/products` },
  openGraph: {
    title: 'Webentric Products — Software That Runs Your Business',
    description: DESCRIPTION,
    url: `${SITE.url}/products`,
    type: 'website',
    images: [`${SITE.url}/images/products/gym-management-system.webp`],
  },
  twitter: { card: 'summary_large_image', title: 'Webentric Products', description: DESCRIPTION, images: [`${SITE.url}/images/products/gym-management-system.webp`] },
};

const LIST_FAQS = [
  { question: 'How fast can a product go live?', answer: 'Most products deploy in 1–3 weeks: we configure your branding, plans, users and data, then train your team. Custom modules add 1–2 weeks depending on scope.' },
  { question: 'Can products be customised for my business?', answer: 'Yes. Every product supports custom fields, pricing, roles, reports and integrations. Tell us your workflow on the contact page and we tailor it before launch.' },
  { question: 'Do I own my data?', answer: '100%. Your customers, transactions and reports stay exportable at all times. We help you migrate existing Excel or register data during onboarding.' },
  { question: 'Is there training and support?', answer: 'Yes. Every deployment includes team training, WhatsApp support and maintenance options so your staff is confident from day one.' },
];

const PERKS = [
  { icon: Zap, title: 'Live in weeks', text: 'Pre-built modules, your branding. Skip 6-month custom builds.' },
  { icon: ShieldCheck, title: 'Your data, secure', text: 'Role-based access, daily backups and full export anytime.' },
  { icon: Rocket, title: 'Grows with you', text: 'Start single-branch, scale to multi-branch without migration.' },
  { icon: Sparkles, title: 'AI-ready', text: 'Add AI support chat, analytics and WhatsApp automation on top.' },
];

export default function ProductsPage() {
  return (
    <main className="bg-page text-ink min-h-screen overflow-x-clip">
      <JsonLd
        data={[
          webPageSchema({ name: 'Products — Ready-to-Deploy Business Software | Webentric', url: `${SITE.url}/products`, description: DESCRIPTION }),
          itemListSchema({
            name: 'Webentric Business Software Products',
            url: `${SITE.url}/products`,
            items: PRODUCTS.map((p) => ({ name: p.name, url: `${SITE.url}/products/${p.slug}`, description: p.tagline, image: p.image })),
          }),
          faqSchema(LIST_FAQS),
          breadcrumbSchema([{ name: 'Home', url: SITE.url }, { name: 'Products', url: `${SITE.url}/products` }]),
        ]}
      />

      {/* ── HERO ── */}
      <section className="relative px-4 sm:px-8 pt-14 pb-12 md:pb-16">
        <div className="pf-orb pf-orb-a" aria-hidden />
        <div className="pf-orb pf-orb-b" aria-hidden />
        <div className="pf-grid-bg" aria-hidden />
        <div className="max-w-6xl mx-auto relative">
          <Reveal delay={80}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight leading-[1.02] mb-6">
              Software that runs
              <br />
              <span className="pf-gradient-text">your business for you.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="max-w-2xl text-muted text-[15px] sm:text-lg leading-relaxed mb-8">
              Stop managing registers, spreadsheets and missed payments. Pick a Webentric product — gym, clinic,
              school, salon, retail, restaurant, PG, billing, inventory, sports or AI support — and go live in weeks
              with automation your staff will actually use.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex flex-wrap gap-3 mb-12">
              <Link href="/contact" className="pf-btn-primary">Get live demo <ArrowRight size={16} /></Link>
              <Link href="#all-products" className="pf-btn-ghost">Browse all 12 ↓</Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {PERKS.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="pf-perk">
                  <p.icon size={18} className="text-ink/80" />
                  <p className="font-medium text-sm mt-2">{p.title}</p>
                  <p className="text-xs text-muted leading-relaxed mt-1">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="pf-marquee border-y border-line py-3 select-none" aria-hidden>
        <div className="pf-marquee-track">
          {[...PRODUCTS, ...PRODUCTS].map((p, i) => (
            <span key={i} className="pf-marquee-item">{p.name} ✦</span>
          ))}
        </div>
      </div>

      {/* ── GRID ── */}
      <section id="all-products" className="max-w-6xl mx-auto px-4 sm:px-8 py-14 md:py-20 scroll-mt-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-10">
            <div>
              <p className="text-xs tracking-[0.22em] text-muted mb-2">THE COLLECTION</p>
              <h2 className="text-2xl sm:text-4xl font-medium tracking-tight">All 12 products</h2>
            </div>
            <p className="text-sm text-muted max-w-sm">Hover a card to preview. Tap to open the full SEO guide — features, benefits, FAQs and live-demo CTA.</p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80}>
              <Link href={`/products/${p.slug}`} className="pf-card group" style={{ '--pf-accent': p.accent }}>
                <div className="pf-card-img">
                  <Image src={p.image} alt={`${p.name} — ${p.tagline}`} width={640} height={400} className="w-full h-44 sm:h-48 object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <span className="pf-chip">{p.category}</span>
                  <span className="pf-glow" aria-hidden />
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{ color: p.accent }}>{String(i + 1).padStart(2, '0')} · {p.shortName}</p>
                  <h3 className="font-medium text-lg leading-snug mb-1 group-hover:underline underline-offset-4">{p.name}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-3">{p.tagline}</p>
                  <p className="text-xs text-muted mb-4">{p.features.slice(0, 3).join(' · ')} +{p.features.length - 3} more</p>
                  <span className="pf-card-link">Explore product <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── STRIP ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-14">
        <Reveal>
          <div className="pf-cta-panel">
            <div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-2">Not sure which fits?</h2>
              <p className="text-sm text-muted max-w-xl leading-relaxed">Tell us your business type on WhatsApp — we reply within hours with the right product, pricing and a free live demo link.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="pf-btn-primary">Talk to us <ArrowRight size={16} /></Link>
              <Link href="/pricing" className="pf-btn-ghost">See pricing</Link>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pb-4">
        <Faq items={LIST_FAQS} />
        <ServiceCTA
          title="Want a live demo of any product?"
          text="Pick any product above and tell us your business size. We set up a personalised demo with your branding, plans and sample data — usually within 24 hours on business days."
        />
      </div>
    </main>
  );
}
