import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import Faq from '../../components/Faq';
import ServiceCTA from '../../components/ServiceCTA';
import JsonLd from '../../components/JsonLd';
import Reveal from '../../components/Reveal';
import { SITE, webPageSchema, breadcrumbSchema, faqSchema } from '../../lib/seo';
import { images } from '../../lib/assets.js';

const TITLE = 'About Webentric — Website Development Company in Delhi, India';
const DESCRIPTION =
  'Webentric is a website development company in New Delhi, India building fast, SEO-friendly business websites, e-commerce stores, landing pages, web applications and digital systems for startups and growing businesses across Delhi NCR and India.';
const URL = `${SITE.url}/about`;
const FOUNDER_IMG = `${SITE.url}/images/founder.png`;

const SERVICES = [
  { label: 'Website Development', to: '/website-development', desc: 'Fast, mobile-first business websites built on React, Tailwind CSS and Firebase or Supabase.' },
  { label: 'Web Design', to: '/web-design', desc: 'Clear, elegant layouts that turn visitors into enquiries — no cookie-cutter templates.' },
  { label: 'E-commerce Development', to: '/ecommerce-development', desc: 'Online stores with catalogs, carts, UPI-friendly checkout and order management.' },
  { label: 'Landing Page Development', to: '/landing-page-development', desc: 'Conversion-focused campaign pages designed around one clear action.' },
  { label: 'Web Application Development', to: '/web-application-development', desc: 'Dashboards, bookings, customer portals and internal tools that scale.' },
  { label: 'Custom Software Development', to: '/custom-software-development', desc: 'CRMs, workflows and automation-ready systems built around your process.' },
  { label: 'Website Redesign', to: '/website-redesign', desc: 'Modern rebuilds of outdated sites that preserve rankings and improve conversions.' },
  { label: 'SEO Services', to: '/seo-services', desc: 'Technical and local SEO foundations so customers in Delhi and India can find you.' },
  { label: 'Website Maintenance', to: '/website-maintenance', desc: 'Updates, backups, monitoring and support — we never disappear after launch.' },
];

const VALUES = [
  { title: 'Listen first', text: 'Every project starts with understanding your business, customers and goals — before a single pixel is placed. Strategy before screens, always.' },
  { title: 'Built to work, not just to impress', text: 'Polish matters, but performance matters more. Every layout, form and page exists to move your business forward — enquiries, bookings, sales.' },
  { title: 'No cookie-cutter layouts', text: 'Your business is unmistakably yours, and your website should be too. We design around your brand, content and customers — never from a template.' },
  { title: 'Partners after launch', text: 'Launch day is the beginning, not the end. Maintenance, SEO and honest advice keep your digital presence growing with your business.' },
];

const STEPS = [
  { n: '01', title: 'Discovery', text: 'A short call or WhatsApp conversation to understand your business, audience, pages, features and integrations.' },
  { n: '02', title: 'Fixed quote', text: 'A written quote in rupees with scope and timeline, sent within 24 hours on business days. No surprises later.' },
  { n: '03', title: 'Design and build', text: 'Interfaces in React and Tailwind CSS with Firebase or Supabase backends and REST API integrations — Razorpay, Stripe, UPI or PayPal where needed.' },
  { n: '04', title: 'Launch and support', text: 'Testing on phones and desktops, careful launch, then maintenance and SEO support for as long as you need it.' },
];

const REVIEW_TEASERS = [
  {
    name: 'Kishanshu Mehra',
    tag: 'Startup Founder · Google review',
    text: 'Working with Webentric was honestly a very smooth experience. Vipin was patient, easy to communicate with, and genuinely interested in understanding our business properly before starting.',
  },
  {
    name: 'Neha Kumari',
    tag: 'Salon Owner · Google review',
    text: 'Had a great experience working with Webentric for our salon website. The whole process felt smooth and stress free, especially since it was our first time getting a website made.',
  },
  {
    name: 'Shahdab Khan',
    tag: 'Local Guide · Google review',
    text: 'Really happy with the website Webentric built for us. They understood our style and made everything look clean, modern, and professional.',
  },
];

const FAQS = [
  {
    question: 'Who is Webentric?',
    answer: 'Webentric is a website development company based in New Delhi, India. We design and build fast, SEO-friendly business websites, e-commerce stores, landing pages, web applications and custom software for startups and growing businesses across Delhi NCR and India.',
  },
  {
    question: 'Who founded Webentric?',
    answer: 'Webentric was founded by Vipin Nawal, who leads every project personally — from the first discovery conversation to launch and beyond. His approach is simple: listen first, then build a digital presence that works as hard for your business as you do.',
  },
  {
    question: 'What services does Webentric offer?',
    answer: 'Website development, web design, e-commerce development, landing pages, web applications, custom software such as CRMs and dashboards, website redesign, SEO services and ongoing website maintenance — everything a business needs to launch and grow online.',
  },
  {
    question: 'Where is Webentric located?',
    answer: 'We are based at D94, Madipur, New Delhi – 110063, India, and serve clients across Delhi, Delhi NCR including Noida and Gurgaon, and the rest of India. Our process is remote-first with calls, WhatsApp updates and live previews.',
  },
  {
    question: 'How much does a website cost at Webentric?',
    answer: 'Starter websites begin at ₹7,999, business websites at ₹14,999 and e-commerce stores at ₹29,999. Every project gets a fixed written quote in rupees — see our pricing page or try the instant cost calculator.',
  },
  {
    question: 'How do I start a project with Webentric?',
    answer: 'Reach out through the contact page or WhatsApp. We reply within 24 hours on business days with a clear quote, timeline and plan — then handle design, development, launch and support end to end.',
  },
];

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['about Webentric', 'website development company Delhi', 'web design company India', 'Vipin Nawal Webentric founder'],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'website',
    images: [{ url: `${SITE.url}/social-media-cover.png`, width: 1200, height: 630, alt: 'About Webentric — website development company in Delhi, India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE.url}/social-media-cover.png`],
  },
};

export default function AboutPage() {
  return (
    <main className="bg-page text-ink min-h-screen">
      <JsonLd
        data={[
          webPageSchema({ name: TITLE, url: URL, description: DESCRIPTION }),
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: TITLE,
            url: URL,
            description: DESCRIPTION,
            inLanguage: 'en-IN',
            isPartOf: { '@id': `${SITE.url}/#website` },
            about: { '@id': `${SITE.url}/#organization` },
            primaryImageOfPage: {
              '@type': 'ImageObject',
              url: FOUNDER_IMG,
              caption: 'Vipin Nawal — Founder of Webentric, website development company in Delhi, India',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Vipin Nawal',
            jobTitle: 'Founder',
            worksFor: { '@id': `${SITE.url}/#organization` },
            image: FOUNDER_IMG,
            description: 'Founder of Webentric — a website development company in New Delhi, India building websites and digital systems for growing businesses.',
          },
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: 'Home', url: SITE.url },
            { name: 'About', url: URL },
          ]),
        ]}
      />
      <div className="max-w-[1600px] mx-auto md:px-20 px-5 pt-24 md:pt-28 pb-20">
        <Breadcrumbs items={[{ label: 'About' }]} />

        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12 md:mb-16">
          <div>
            <p className="t-eyebrow mb-4">ABOUT WEBENTRIC — NEW DELHI · INDIA</p>
            <h1 className="t-h1 mb-6">
              A website development company in Delhi, built for businesses that want more than a website
            </h1>
            <div className="space-y-4 t-body">
              <p>
                <Link href="/" className="text-ink underline underline-offset-4">Webentric</Link> is a web design and{' '}
                <Link href="/website-development" className="text-ink underline underline-offset-4">website development company</Link> based in
                New Delhi, India. We help startups, local businesses, schools, clinics, restaurants and growing brands establish a clear online
                presence with websites that load fast, read beautifully on phones and turn visits into enquiries.
              </p>
              <p>
                But we don&apos;t stop at websites. We build the digital systems businesses run on —{' '}
                <Link href="/landing-page-development" className="text-ink underline underline-offset-4">conversion-focused landing pages</Link>,{' '}
                <Link href="/web-application-development" className="text-ink underline underline-offset-4">tailored web applications</Link>, customer
                portals, internal dashboards and automation-ready workflows. See the proof in our{' '}
                <Link href="/portfolio" className="text-ink underline underline-offset-4">portfolio</Link> — 14 in-depth case studies across
                education, hospitality, fitness, healthcare and B2B.
              </p>
            </div>
          </div>
          <Reveal y={40}>
            <figure className="bg-surface border border-edge overflow-hidden">
              <Image
                src={images.about}
                alt="Webentric team designing and developing a business website for a client in Delhi, India"
                width={900}
                height={620}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto object-cover"
              />
              <div className="flex items-center gap-2 px-4 py-3 border-t border-line">
                <span className="w-2 h-2 rounded-full bg-edge" />
                <span className="w-2 h-2 rounded-full bg-edge" />
                <span className="w-2 h-2 rounded-full bg-edge" />
                <span className="t-micro ml-2 uppercase">Webentric · New Delhi, India</span>
              </div>
            </figure>
          </Reveal>
        </div>

        {/* ── Stats band ───────────────────────────────────── */}
        <section aria-label="Webentric in numbers" className="border-y border-line bg-surface/60 -mx-5 md:-mx-20 px-5 md:px-20 py-10 md:py-14 mb-14 md:mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '50+', label: 'Projects completed', text: 'Websites, stores and web apps delivered for Indian businesses.' },
              { value: '14', label: 'Published case studies', text: 'Every project documented with screenshots in our portfolio.', to: '/portfolio' },
              { value: '6+', label: 'Years of experience', text: 'Modern React builds with performance-first engineering.' },
              { value: '24hr', label: 'Response promise', text: 'A clear quote and plan within one business day.', to: '/contact' },
            ].map((s) => (
              <Reveal key={s.label}>
                <div>
                  <p className="t-stat mb-2">{s.value}</p>
                  <p className="font-medium text-sm mb-1">
                    {s.to ? (
                      <Link href={s.to} className="underline underline-offset-4 decoration-line hover:decoration-ink transition-colors">{s.label}</Link>
                    ) : s.label}
                  </p>
                  <p className="text-xs text-muted leading-relaxed">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── From the founder ─────────────────────────────── */}
        <section aria-label="From the founder" className="border-y border-line bg-surface/60 -mx-5 md:-mx-20 px-5 md:px-20 py-12 md:py-16 mb-14 md:mb-20 scroll-mt-24">
          <Reveal><p className="t-eyebrow mb-4">FROM THE FOUNDER</p></Reveal>
          <Reveal delay={60}>
            <h2 className="t-h2 mb-10 max-w-4xl">
              Most agencies can build you a website. We make it work for your business.
            </h2>
          </Reveal>
          <div className="grid lg:grid-cols-[400px_1fr] gap-8 lg:gap-14 items-start">
            <Reveal y={40} className="lg:sticky lg:top-24 self-start w-full max-w-[420px]">
              <figure className="bg-surface border border-edge overflow-hidden">
                <Image
                  src={images.founder}
                  alt="Vipin Nawal — Founder of Webentric, website development company in Delhi, India"
                  width={720}
                  height={960}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="w-full h-auto object-cover object-top aspect-[3/4]"
                />
                <figcaption className="px-5 py-4 border-t border-line">
                  <p className="font-medium">Vipin Nawal</p>
                  <p className="t-micro mt-1">Founder, Webentric</p>
                </figcaption>
              </figure>
            </Reveal>
            <div className="space-y-5 t-body min-w-0">
              <Reveal delay={80}>
                <p className="text-ink text-lg sm:text-xl leading-relaxed font-normal border-l-2 border-edge pl-5">
                  Most agencies can build you a website. Some can make it look beautiful. At Webentric, we focus on making it work for your business.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p>
                  We bring together the polish you expect from world-class brands, the speed of a modern product team, and the attention of a partner
                  who understands your goals. No confusing process. No cookie-cutter layouts. No disappearing after launch.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p>
                  Beyond websites, we build the digital systems that help businesses run and grow: conversion-focused landing pages, tailored web
                  applications, customer portals, internal dashboards, automation-ready workflows, and scalable digital products. Everything is designed
                  to feel connected, useful, and ready for what comes next.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  We listen first, then build a digital presence that feels unmistakably yours — clear for your customers, powerful for your team, and
                  refined enough to compete with the biggest names in your space.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <p>
                  Your website is often the first conversation people have with your business. We make sure it&apos;s a great one.
                </p>
              </Reveal>
              <Reveal delay={280}>
                <p className="pt-2">
                  <span className="block text-ink font-medium">Vipin Nawal</span>
                  <span className="block t-micro mt-1">Founder, Webentric</span>
                </p>
              </Reveal>
              <Reveal delay={320}>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-on-accent text-sm font-medium hover:bg-accent/85 transition-colors"
                  >
                    Work With Us <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-edge text-sm text-ink hover:border-ink transition-colors"
                  >
                    See Our Work
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── What we do ───────────────────────────────────── */}
        <section aria-label="What Webentric does" className="mb-14 md:mb-20">
          <Reveal><h2 className="t-h2 mb-3">What we do</h2></Reveal>
          <Reveal delay={60}>
            <p className="t-body max-w-3xl mb-8">
              Nine core services plus ready-to-deploy <Link href="/products" className="text-ink underline underline-offset-4">business software</Link> —
              from school, gym, salon and clinic management systems to billing and inventory. One partner for your entire digital presence.
            </p>
          </Reveal>
          <div className="border-t border-line">
            {SERVICES.map((s, i) => (
              <Reveal key={s.to} delay={Math.min(i * 40, 200)}>
                <Link
                  href={s.to}
                  className="group grid grid-cols-[44px_1fr_auto] sm:grid-cols-[64px_1fr_auto] items-center gap-3 sm:gap-6 py-5 sm:py-6 border-b border-line"
                >
                  <span className="t-eyebrow">0{i + 1}</span>
                  <span className="min-w-0">
                    <span className="block text-lg sm:t-h3 group-hover:translate-x-1 transition-transform duration-300">{s.label}</span>
                    <span className="block text-muted text-sm leading-relaxed mt-1 max-w-2xl">{s.desc}</span>
                  </span>
                  <span className="inline-flex items-center justify-center w-10 h-10 border border-edge text-muted group-hover:bg-accent group-hover:text-on-accent group-hover:border-accent transition-colors shrink-0" aria-hidden="true">
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Values ───────────────────────────────────────── */}
        <section aria-label="What Webentric believes" className="border-y border-line bg-surface/60 -mx-5 md:-mx-20 px-5 md:px-20 py-12 md:py-16 mb-14 md:mb-20">
          <Reveal><p className="t-eyebrow mb-2">WHAT WE BELIEVE</p></Reveal>
          <Reveal delay={60}><h2 className="t-h2 mb-8">Four principles behind every build</h2></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {VALUES.map((v) => (
              <Reveal key={v.title}>
                <div className="bg-surface border border-line p-6 h-full">
                  <h3 className="t-h3 mb-2">{v.title}</h3>
                  <p className="t-small">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── How we work ──────────────────────────────────── */}
        <section className="mb-14 md:mb-20" aria-label="How Webentric works">
          <Reveal><h2 className="t-h2 mb-10">How we work</h2></Reveal>
          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((s, idx) => (
              <li key={s.n} className="relative pl-12 lg:pl-0 lg:pt-12">
                {idx < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[15px] top-10 -bottom-10 w-px bg-edge lg:left-10 lg:right-[-24px] lg:top-[15px] lg:bottom-auto lg:w-auto lg:h-px"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 lg:top-0 flex h-8 w-8 items-center justify-center rounded-full border border-edge bg-surface t-micro"
                >
                  {s.n}
                </span>
                <h3 className="t-h3 mb-2">{s.title}</h3>
                <p className="t-small">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Reviews teaser ───────────────────────────────── */}
        <section aria-label="What clients say" className="mb-14 md:mb-20">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <Reveal>
              <h2 className="t-h2">Loved by Delhi businesses</h2>
            </Reveal>
            <Reveal delay={80}>
              <Link href="/reviews" className="inline-flex items-center gap-1.5 text-sm text-ink underline underline-offset-4 decoration-line hover:decoration-ink transition-colors">
                Read all reviews <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {REVIEW_TEASERS.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 70}>
                <figure className="bg-surface border border-line p-6 h-full flex flex-col">
                  <span className="flex gap-0.5 mb-4" aria-label="Rated 5 out of 5">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={14} fill="currentColor" aria-hidden="true" />
                    ))}
                  </span>
                  <blockquote className="t-small flex-1">“{r.text}”</blockquote>
                  <figcaption className="mt-5 pt-4 border-t border-line">
                    <p className="font-medium text-sm">{r.name}</p>
                    <p className="text-xs text-muted mt-0.5">{r.tag}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Who we serve ─────────────────────────────────── */}
        <section aria-label="Who Webentric serves" className="mb-14 md:mb-20">
          <Reveal><h2 className="t-h2 mb-6">Who we build for</h2></Reveal>
          <Reveal delay={80}>
            <p className="t-body max-w-3xl mb-6">
              From first-time founders to established local brands — if your business needs customers to find you,
              trust you and contact you online, we&apos;re built for you. Our industry playbooks cover{' '}
              <Link href="/industries/small-business" className="text-ink underline underline-offset-4">small businesses</Link>,{' '}
              <Link href="/industries/startups" className="text-ink underline underline-offset-4">startups</Link>,{' '}
              <Link href="/industries/education" className="text-ink underline underline-offset-4">schools</Link>,{' '}
              <Link href="/industries/restaurants-cafes" className="text-ink underline underline-offset-4">restaurants &amp; cafes</Link> and{' '}
              <Link href="/industries/fitness" className="text-ink underline underline-offset-4">gyms &amp; fitness studios</Link> — and our local
              SEO roots run deep in <Link href="/locations/delhi" className="text-ink underline underline-offset-4">Delhi</Link>,{' '}
              <Link href="/locations/delhi-ncr" className="text-ink underline underline-offset-4">Delhi NCR</Link>,{' '}
              <Link href="/locations/noida" className="text-ink underline underline-offset-4">Noida</Link> and{' '}
              <Link href="/locations/gurgaon" className="text-ink underline underline-offset-4">Gurgaon</Link>, serving all of India remotely.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <address className="not-italic t-body max-w-3xl border-l-2 border-edge pl-4">
              Webentric, D94, Madipur, New Delhi – 110063, India · Phone:{' '}
              <a href="tel:+919560342636" className="text-ink underline underline-offset-4">+91 9560342636</a>
              {' '}· Email:{' '}
              <a href="mailto:webentric2026@gmail.com" className="text-ink underline underline-offset-4">webentric2026@gmail.com</a>
              {' '}· Hours: Mon–Fri, 10 AM – 6 PM IST.
            </address>
          </Reveal>
        </section>

        <Faq items={FAQS} />

        <ServiceCTA
          title="Let's start with a conversation"
          text="Tell us about your business and goals. Get a clear quote, timeline and plan — within 24 hours on business days."
        />
      </div>
    </main>
  );
}
