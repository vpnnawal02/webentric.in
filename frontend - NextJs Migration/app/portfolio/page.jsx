import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import PortfolioCtaButton from './PortfolioCtaButton';
import JsonLd from '../../components/JsonLd';
import { SITE, webPageSchema, itemListSchema, breadcrumbSchema } from '../../lib/seo';
import { PORTFOLIO_PROJECTS } from '../../lib/portfolio-data';

export const metadata = {
  title: 'Our Web Design Work in Delhi, India',
  description: 'Explore websites designed & developed by Webentric — schools, salons, cafes, stores & startups across Delhi NCR and India.',
  keywords: ['web design portfolio Delhi', 'website examples India', 'web development projects Delhi'],
  alternates: { canonical: 'https://webentric.in/portfolio' },
  openGraph: {
    title: 'Our Web Design Work in Delhi, India',
    description: 'Explore websites designed & developed by Webentric — schools, salons, cafes, stores & startups across Delhi NCR and India.',
    url: 'https://webentric.in/portfolio',
    type: 'website',
    images: ['https://webentric.in/social-media-cover.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Web Design Work in Delhi, India',
    description: 'Explore websites designed & developed by Webentric — schools, salons, cafes, stores & startups across Delhi NCR and India.',
    images: ["https://webentric.in/social-media-cover.png"],
  },
};

export default function PortfolioPage() {
  return (
    <main className="bg-page py-10 md:py-14" id="portfolio">
      <JsonLd
        data={[
          webPageSchema({ name: 'Webentric Portfolio — Web Design Work in Delhi, India', url: `${SITE.url}/portfolio`, description: 'Selected website design and development projects across Delhi NCR and India.' }),
          itemListSchema({ name: 'Webentric portfolio', url: `${SITE.url}/portfolio`, items: PORTFOLIO_PROJECTS.map((p) => ({ name: p.title, url: `${SITE.url}/portfolio/${p.slug}`, description: p.description, image: p.cover })) }),
          breadcrumbSchema([{ name: 'Home', url: SITE.url }, { name: 'Portfolio', url: `${SITE.url}/portfolio` }]),
        ]}
      />

      <div className="max-w-full mx-auto md:px-20 px-5">
        {/* Heading */}
        <div className="text-center max-w-[700px] mx-auto">
          <h1 className="t-h1">
            Projects That Help Businesses Succeed Online
          </h1>

          <p className="mt-4 t-lead">
            Explore some of the websites and digital experiences we&apos;ve built for
            startups and growing businesses.
          </p>
        </div>

        {/* Projects grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <Link
              key={index}
              href={`/portfolio/${project.slug}`}
              aria-label={`View ${project.shortName} case study`}
              className="group bg-surface border border-edge rounded-none overflow-hidden hover:bg-raised hover:border-edge transition-all duration-300 flex flex-col"
            >
              {/* Project image */}
              <div className="relative overflow-hidden aspect-auto bg-surface">
                <Image
                  src={project.cover}
                  alt={`${project.shortName} — website designed and developed by Webentric`}
                  width={800}
                  height={500}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/22 to-transparent opacity-80 pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <p className="t-micro mb-2">{project.category}</p>
                <h3 className="t-h3 mb-2">
                  {project.shortName}
                </h3>

                <p className="t-body mb-3">
                  {project.description}
                </p>

                <p className="t-micro mb-4">
                  {project.tech.join(' • ')}
                </p>

                <div className="mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-ink/70 transition-colors">
                    View Case Study
                    <FiArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="t-body mb-4">
            Want a website like these for your business?
          </p>

          <PortfolioCtaButton />

          <p className="t-small mt-6">
            Or explore our{' '}
            <Link href="/website-development" className="text-muted hover:text-ink underline underline-offset-4 transition-colors">
              website development
            </Link>
            {', '}
            <Link href="/ecommerce-development" className="text-muted hover:text-ink underline underline-offset-4 transition-colors">
              ecommerce development
            </Link>
            {' '}and{' '}
            <Link href="/website-redesign" className="text-muted hover:text-ink underline underline-offset-4 transition-colors">
              website redesign
            </Link>
            {' '}services.
          </p>
        </div>
      </div>
    </main>
  );
}
