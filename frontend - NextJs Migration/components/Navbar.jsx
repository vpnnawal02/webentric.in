'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const LEFT_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blogs', href: '/blogs' },
];
const RIGHT_LINKS = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];
const NAV_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];
const DROPDOWN_LINKS = [
  { label: 'Calculate Website Cost', href: '/price-calculator' },
  { label: 'Admin Login', href: '/admin/login' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeMobile = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
  };
  const linkClass = (href) =>
    `relative px-3 py-2 text-[11px] sm:text-xs xl:text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-200 whitespace-nowrap ${
      pathname === href ? 'text-ink nb-nav-link-active' : 'text-muted hover:text-ink'
    }`;

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-page border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <img src="/logo_circle.png" alt="Webentric logo" className="w-10 h-10" />
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
              </div>
              <Link href="/" className="flex items-center gap-2 mx-6">
                <img src="/logo_circle.png" alt="Webentric logo" className="w-10 h-10" />
                <span className="font-semibold tracking-[0.25em] text-base xl:text-lg text-ink uppercase">Webentric</span>
              </Link>
              <div className="flex items-center gap-2 xl:gap-4">
                {RIGHT_LINKS.map(({ label, href }) => (
                  <Link key={href} href={href} className={linkClass(href)}>
                    {label}
                    <span className="nb-nav-active-bar" aria-hidden />
                  </Link>
                ))}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen((p) => !p)}
                    onBlur={(e) => {
                      if (!e.currentTarget.parentElement.contains(e.relatedTarget)) setDropdownOpen(false);
                    }}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    className="flex items-center gap-1 px-3 py-2 text-[11px] xl:text-[13px] font-medium tracking-[0.15em] uppercase text-muted hover:text-ink transition-colors duration-200"
                  >
                    More
                    <ChevronDown size={13} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`nb-dropdown absolute right-0 top-full mt-3 w-56 bg-surface border border-line rounded-lg shadow-xl shadow-black/60 overflow-hidden z-50 py-1 ${
                      dropdownOpen ? 'nb-open' : ''
                    }`}
                  >
                    {DROPDOWN_LINKS.map(({ label, href }) => {
                      const active = pathname === href;
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setDropdownOpen(false)}
                          className={`flex items-center justify-between px-4 py-2.5 text-xs tracking-wide transition-colors duration-150 ${
                            active ? 'bg-accent text-on-accent font-semibold' : 'text-muted hover:text-ink hover:bg-ink/5'
                          }`}
                        >
                          {label}
                          <ArrowUpRight size={13} className={active ? 'text-on-accent/70' : 'text-muted'} />
                        </Link>
                      );
                    })}
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
            <img src="/logo_circle.png" alt="Webentric logo" className="w-10 h-10" />
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
          <div className="nb-mobile-link">
            <button
              onClick={() => setDropdownOpen((p) => !p)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium tracking-widest uppercase text-muted hover:bg-ink/5 transition-colors"
              aria-expanded={dropdownOpen}
            >
              More
              <ChevronDown size={15} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`nb-accordion ml-3 mt-1 border-l-2 border-line pl-3 ${dropdownOpen ? 'nb-open' : ''}`}>
              <div>
                {DROPDOWN_LINKS.map(({ label, href }) => {
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
