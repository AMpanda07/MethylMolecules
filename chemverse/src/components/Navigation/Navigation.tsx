'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import AtomIcon from '@/components/icons/AtomIcon';
import SearchIcon from '@/components/icons/SearchIcon';
import MenuIcon from '@/components/icons/MenuIcon';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/elements', label: 'Periodic Table' },
  { href: '/discover', label: 'Elements' },
  { href: '/molecules', label: 'Molecules' },
  { href: '/learn', label: 'Learn' },
] as const;

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`${styles.nav} ${isScrolled ? styles.navScrolled : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.navInner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Methyle Molecule home">
            <span className={styles.logoIcon} aria-hidden="true">
              <AtomIcon size={28} />
            </span>
            <span className={styles.logoText}>Methyle Molecule</span>
          </Link>

          {/* Desktop links */}
          <ul className={styles.links} role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.link} ${isActiveLink(href) ? styles.linkActive : ''}`}
                  aria-current={isActiveLink(href) ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search + Mobile menu button */}
          <div className={styles.actions}>
            <div
              className={`${styles.searchWrap} ${isSearchFocused ? styles.searchFocused : ''}`}
            >
              <span className={styles.searchIcon} aria-hidden="true">
                <SearchIcon size={16} />
              </span>
              <input
                type="search"
                placeholder="Search elements, molecules..."
                className={styles.searchInput}
                aria-label="Search elements, molecules or topics"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                id="nav-search"
              />
            </div>

            <button
              className={styles.mobileMenuBtn}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <MenuIcon size={22} isOpen={isMobileMenuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
      >
        <div className={styles.mobileSearch}>
          <span className={styles.searchIcon} aria-hidden="true">
            <SearchIcon size={16} />
          </span>
          <input
            type="search"
            placeholder="Search elements, molecules..."
            className={styles.searchInput}
            aria-label="Search"
          />
        </div>
        <ul role="list" className={styles.mobileLinks}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.mobileLink} ${isActiveLink(href) ? styles.mobileLinkActive : ''}`}
                aria-current={isActiveLink(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
