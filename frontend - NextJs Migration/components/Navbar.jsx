'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const LEFT_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
];
const RIGHT_LINKS = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];
const NAV_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

const PRODUCT_LINKS = [
  { label: 'All Products', href: '/products', desc: 'Browse all 12 systems', accent: '#ffffff' },
  { label: 'Gym Management', href: '/products/gym-management-system', desc: 'Members, plans & renewals', accent: '#22d3ee' },
  { label: 'Clinic Management', href: '/products/doctor-clinic-management-system', desc: 'OPD, queue & Rx', accent: '#34d399' },
  { label: 'School Management', href: '/products/school-management-system', desc: 'ERP, fees & exams', accent: '#818cf8' },
  { label: 'Coaching Institute', href: '/products/coaching-institute-management-system', desc: 'Batches & test series', accent: '#f472b6' },
  { label: 'Sports Academy', href: '/products/sports-academy-management-system', desc: 'Players & tournaments', accent: '#fbbf24' },
  { label: 'Salon & Spa', href: '/products/salon-spa-management-system', desc: 'Bookings & loyalty', accent: '#f0abfc' },
  { label: 'Retail Shop', href: '/products/retail-shop-management-system', desc: 'POS & barcode billing', accent: '#38bdf8' },
  { label: 'Inventory', href: '/products/inventory-management-system', desc: 'Stock & warehouses', accent: '#a3e635' },
  { label: 'Restaurant & Cafe', href: '/products/restaurant-cafe-management-system', desc: 'KOT, tables & food cost', accent: '#fb923c' },
  { label: 'PG, Hostel & Rent', href: '/products/pg-hostel-rent-management-system', desc: 'Beds, rent & dues', accent: '#2dd4bf' },
  { label: 'Invoice & Billing', href: '/products/invoice-billing-management-system', desc: 'GST invoices in seconds', accent: '#c084fc' },
  { label: 'AI Support System', href: '/products/ai-customer-support-system', desc: '24×7 AI chat & leads', accent: '#67e8f9' },
];
const PRODUCT_HREFS = new Set(PRODUCT_LINKS.map((l) => l.href));

// Organized "More" menu — every link verified against app/ routes.
// Only pages lacking primary-navbar access. Private/legal pages excluded:
// /admin, /admin/login (private), 404, /privacy-policy + /terms (footer).
const MORE_SECTIONS = [
  {
    heading: 'Services',
    links: [
      { label: 'Website Development', href: '/website-development' },
      { label: 'Web Design', href: '/web-design' },
      { label: 'Ecommerce Development', href: '/ecommerce-development' },
      { label: 'Custom Software', href: '/custom-software-development' },
      { label: 'Web Applications', href: '/web-application-development' },
      { label: 'Landing Pages', href: '/landing-page-development' },
      { label: 'Website Redesign', href: '/website-redesign' },
      { label: 'Maintenance & Support', href: '/website-maintenance' },
      { label: 'SEO Services', href: '/seo-services' },
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'Small Business', href: '/industries/small-business' },
      { label: 'Startups', href: '/industries/startups' },
      { label: 'Education', href: '/industries/education' },
      { label: 'Restaurants & Cafes', href: '/industries/restaurants-cafes' },
      { label: 'Fitness', href: '/industries/fitness' },
    ],
  },
  {
    heading: 'Locations',
    links: [
      { label: 'Delhi', href: '/locations/delhi' },
      { label: 'Delhi NCR', href: '/locations/delhi-ncr' },
      { label: 'Noida', href: '/locations/noida' },
      { label: 'Gurgaon', href: '/locations/gurgaon' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blogs', href: '/blogs' },
      { label: 'Cost Calculator', href: '/price-calculator' },
      { label: 'Careers', href: '/careers' },
    ],
  },
];
const MORE_HREFS = new Set(MORE_SECTIONS.flatMap((s) => s.links.map((l) => l.href)));

const OPEN_DELAY = 120;
const CLOSE_DELAY = 180;

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const hoverTimer = useRef(null);
  const prodTimer = useRef(null);

  const clearHoverTimer = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };
  const scheduleOpen = () => {
    clearHoverTimer();
    hoverTimer.current = setTimeout(() => setDropdownOpen(true), OPEN_DELAY);
  };
  const scheduleClose = () => {
    clearHoverTimer();
    hoverTimer.current = setTimeout(() => setDropdownOpen(false), CLOSE_DELAY);
  };
  const closeMobile = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setProductsOpen(false);
  };
  const onMoreKeyDown = (e) => {
    if (e.key === 'Escape') {
      clearHoverTimer();
      setDropdownOpen(false);
    }
  };

  const moreActive = MORE_HREFS.has(pathname);
  const productsActive = pathname === '/products' || pathname.startsWith('/products/');
  const linkClass = (href) =>
    `relative px-3 py-2 text-[11px] sm:text-xs xl:text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-200 whitespace-nowrap ${
      pathname === href ? 'text-ink nb-nav-link-active' : 'text-muted hover:text-ink'
    }`;
  const moreButtonClass = `relative flex items-center gap-1 px-3 py-2 text-[11px] xl:text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-200 ${
    moreActive ? 'text-ink' : 'text-muted hover:text-ink'
  }`;

  const renderMoreLink = ({ label, href }) => {
    const active = pathname === href;
    return (
      <Link
        key={href}
        href={href}
        onClick={() => {
          clearHoverTimer();
          setDropdownOpen(false);
        }}
        className={`flex items-center justify-between gap-2 px-4 py-3 text-[13px] tracking-wide transition-colors duration-150 ${
          active ? 'bg-accent text-on-accent font-semibold' : 'text-muted hover:text-ink hover:bg-ink/5'
        }`}
      >
        <span className="truncate">{label}</span>
        <ArrowUpRight size={14} className={`shrink-0 ${active ? 'text-on-accent/70' : 'text-muted'}`} />
      </Link>
    );
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-page border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <Image src="/logo_circle.png" alt="Webentric — website development company in Delhi" width={40} height={40} className="w-10 h-10" />
              <span className="font-semibold tracking-[0.2em] text-lg sm:text-base text-ink uppercase">Webentric</span>
            </Link>
            <div className="hidden lg:flex items-center justify-between w-full">
              <div className="flex items-center gap-2 xl:gap-4">
                {LEFT_LINKS.map(({ label, href }) => (
                  <Link key={href} href={href} className={linkClass(href)}>
                    {label}
                    <span className="nb-nav-active-bar" aria-hidden />
                  </Link>
                ))}
                {/* Products — hover opens on desktop, click toggles */}
                <div
                  className="relative"
                  onMouseEnter={() => {
                    if (prodTimer.current) clearTimeout(prodTimer.current);
                    prodTimer.current = setTimeout(() => setProductsOpen(true), OPEN_DELAY);
                  }}
                  onMouseLeave={() => {
                    if (prodTimer.current) clearTimeout(prodTimer.current);
                    prodTimer.current = setTimeout(() => setProductsOpen(false), CLOSE_DELAY);
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setProductsOpen(false);
                  }}
                >
                  <div
                    className={`relative flex items-center px-3 py-2 text-[11px] sm:text-xs xl:text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-200 whitespace-nowrap ${
                      productsActive ? 'text-ink nb-nav-link-active' : 'text-muted hover:text-ink'
                    }`}
                  >
                    <Link href="/products" onClick={() => setProductsOpen(false)}>
                      Products
                    </Link>
                    <button
                      onClick={() => setProductsOpen((p) => !p)}
                      aria-expanded={productsOpen}
                      aria-haspopup="true"
                      aria-label="Toggle products menu"
                      className="ml-1 p-0.5 flex items-center"
                      tabIndex={0}
                    >
                      <ChevronDown size={13} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <span className="nb-nav-active-bar" aria-hidden />
                  </div>
                  <div
                    className={`nb-dropdown absolute left-0 top-full mt-3 w-[42rem] max-w-[calc(100vw-2rem)] bg-surface border border-line shadow-xl shadow-black/60 z-50 p-5 ${
                      productsOpen ? 'nb-open' : ''
                    }`}
                  >
                    <Link
                      href="/products"
                      onClick={() => setProductsOpen(false)}
                      className="pf-nav-featured group"
                    >
                      <span className="pf-nav-featured-text">
                        <span className="block text-sm font-semibold tracking-wide">All Products</span>
                        <span className="block text-xs text-muted mt-0.5">Browse all 12 ready-to-deploy systems →</span>
                      </span>
                      <ArrowUpRight size={16} className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                    <div className="pf-nav-grid">
                      {PRODUCT_LINKS.slice(1).map(({ label, href, desc, accent }) => {
                        const active = pathname === href;
                        return (
                          <Link
                            key={href}
                            href={href}
                            onClick={() => setProductsOpen(false)}
                            className={`pf-nav-item ${active ? 'pf-nav-active' : ''}`}
                          >
                            <span className="pf-nav-dot" style={{ background: accent }} />
                            <span className="min-w-0">
                              <span className="block text-[13px] font-medium truncate">{label}</span>
                              <span className="block text-xs text-muted truncate">{desc}</span>
                            </span>
                            <ArrowUpRight size={14} className="shrink-0 text-muted" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <Link href="/" className="flex items-center gap-2 mx-6">
                <Image src="/logo_circle.png" alt="Webentric — website development company in Delhi" width={40} height={40} className="w-10 h-10" priority={false} />
                <span className="font-semibold tracking-[0.25em] text-base xl:text-lg text-ink uppercase">Webentric</span>
              </Link>
              <div className="flex items-center gap-2 xl:gap-4">
                {RIGHT_LINKS.map(({ label, href }) => (
                  <Link key={href} href={href} className={linkClass(href)}>
                    {label}
                    <span className="nb-nav-active-bar" aria-hidden />
                  </Link>
                ))}
                {/* More — hover opens on desktop, click toggles (touch/keyboard) */}
                <div
                  className="relative"
                  onMouseEnter={scheduleOpen}
                  onMouseLeave={scheduleClose}
                  onKeyDown={onMoreKeyDown}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      clearHoverTimer();
                      setDropdownOpen(false);
                    }
                  }}
                >
                  <button
                    onClick={() => {
                      clearHoverTimer();
                      setDropdownOpen((p) => !p);
                    }}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    className={moreButtonClass}
                  >
                    More
                    <ChevronDown size={13} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    {moreActive && <span className="nb-nav-active-bar nb-nav-on" aria-hidden />}
                  </button>

                  <div
                    className={`nb-dropdown absolute right-0 top-full mt-3 w-[52rem] max-w-[calc(100vw-2rem)] bg-surface border border-line shadow-xl shadow-black/60 z-50 p-7 ${
                      dropdownOpen ? 'nb-open' : ''
                    }`}
                  >
                    <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-8">
                      {MORE_SECTIONS.map((section) => (
                        <div key={section.heading} className="min-w-0">
                          <p className="nb-section-heading">
                            {section.heading}
                          </p>
                          <div className="flex flex-col gap-1">
                            {section.links.map(renderMoreLink)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <ThemeToggle />
                <Link href="/contact">
                  <span className="ml-3 inline-block px-5 py-2.5 border border-edge hover:border-ink hover:bg-accent hover:text-on-accent text-ink text-[11px] xl:text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-200 active:scale-95">
                    Get a Quote
                  </span>
                </Link>
              </div>
            </div>
            <div className="lg:hidden flex items-center gap-2.5">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen((p) => !p)}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-ink hover:bg-ink/10 transition-colors relative"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <span className={`nb-icon-wrap absolute ${mobileOpen ? 'nb-exit' : ''}`} aria-hidden={mobileOpen}>
                  <Menu size={24} />
                </span>
                <span className={`nb-icon-wrap absolute ${!mobileOpen ? 'nb-exit' : ''}`} aria-hidden={!mobileOpen}>
                  <X size={24} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`nb-backdrop fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden ${mobileOpen ? 'nb-open' : ''}`}
        onClick={closeMobile}
        aria-hidden
      />
      <div
        className={`nb-drawer fixed inset-0 z-50 w-full h-full bg-page shadow-2xl flex flex-col lg:hidden ${mobileOpen ? 'nb-open' : ''}`}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between px-5 sm:px-6 pt-6 pb-4 border-b border-line">
          <span className="flex items-center gap-2">
            <Image src="/logo_circle.png" alt="Webentric — website development company in Delhi" width={40} height={40} className="w-10 h-10" />
            <span className="text-sm sm:text-base font-semibold tracking-[0.2em] text-ink uppercase">Webentric</span>
          </span>
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <button
              onClick={closeMobile}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:bg-ink/10 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="flex flex-col px-4 sm:px-6 pt-8 pb-2 gap-1 flex-1 overflow-y-auto">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <div key={href} className="nb-mobile-link">
                <Link
                  href={href}
                  onClick={closeMobile}
                  className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium tracking-widest uppercase transition-all duration-150 ${
                    active ? 'bg-accent text-on-accent font-semibold' : 'text-muted hover:bg-ink/5 hover:text-ink'
                  }`}
                >
                  {label}
                  {active && <ArrowUpRight size={14} className="text-on-accent/70" />}
                </Link>
              </div>
            );
          })}
          {/* Mobile Products — tap to expand/collapse, header links to /products */}
          <div className="nb-mobile-link">
            <div className="flex items-center justify-between w-full px-4 py-3 rounded-xl">
              <Link
                href="/products"
                onClick={closeMobile}
                className={`flex-1 text-sm font-medium tracking-widest uppercase transition-colors ${
                  productsActive ? 'text-ink font-semibold' : 'text-muted'
                }`}
              >
                Products
              </Link>
              <button
                onClick={() => setProductsOpen((p) => !p)}
                className="p-1 text-muted hover:text-ink transition-colors"
                aria-expanded={productsOpen}
                aria-haspopup="true"
                aria-label="Toggle products menu"
              >
                <ChevronDown size={15} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <div className={`nb-accordion mt-1 ${productsOpen ? 'nb-open' : ''}`}>
              <div className="flex flex-col gap-4 py-2">
                <div>
                  <div className="ml-3 border-l-2 border-line pl-3 flex flex-col">
                    {PRODUCT_LINKS.map(({ label, href }) => {
                      const active = pathname === href;
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={closeMobile}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm tracking-wide transition-colors ${
                            active ? 'bg-accent text-on-accent font-semibold' : 'text-muted hover:text-ink hover:bg-ink/5'
                          }`}
                        >
                          {label}
                          <ArrowUpRight size={12} className={active ? 'text-on-accent/70' : 'text-muted'} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile More — tap to expand/collapse */}
          <div className="nb-mobile-link">
            <button
              onClick={() => setDropdownOpen((p) => !p)}
              onKeyDown={onMoreKeyDown}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium tracking-widest uppercase text-muted hover:bg-ink/5 transition-colors"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              More
              <ChevronDown size={15} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`nb-accordion mt-1 ${dropdownOpen ? 'nb-open' : ''}`}>
              <div className="flex flex-col gap-4 py-2">
                {MORE_SECTIONS.map((section) => (
                  <div key={section.heading}>
                    <p className="px-4 mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40">
                      {section.heading}
                    </p>
                    <div className="ml-3 border-l-2 border-line pl-3 flex flex-col">
                      {section.links.map(({ label, href }) => {
                        const active = pathname === href;
                        return (
                          <Link
                            key={href}
                            href={href}
                            onClick={closeMobile}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm tracking-wide transition-colors ${
                              active ? 'bg-accent text-on-accent font-semibold' : 'text-muted hover:text-ink hover:bg-ink/5'
                            }`}
                          >
                            {label}
                            <ArrowUpRight size={12} className={active ? 'text-on-accent/70' : 'text-muted'} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="nb-drawer-footer px-5 sm:px-6 pb-8 pt-4 border-t border-line">
          <Link href="/contact" onClick={closeMobile}>
            <span className="block text-center w-full py-3 border border-edge hover:bg-accent hover:text-on-accent text-ink text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-200 active:scale-95">
              Get a Free Quote
            </span>
          </Link>
          <p className="text-center text-[11px] text-muted mt-3 tracking-wide">webentric.in · Web Development Agency</p>
        </div>
      </div>
    </>
  );
}
