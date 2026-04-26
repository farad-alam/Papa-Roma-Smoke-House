'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Flame } from 'lucide-react';
import siteConfig from '@/data/siteConfig.json';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Flame size={24} />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>Papa Roma</span>
            <span className={styles.logoSub}>Smoke House</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks}>
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href={`https://wa.me/${siteConfig.restaurant.whatsapp}?text=Hi! I'd like to make a reservation at Papa Roma Smoke House 🔥`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtn}
        >
          Reserve Now
        </a>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileOpen : ''}`}>
        <ul className={styles.mobileLinks}>
          {siteConfig.navLinks.map((link, i) => (
            <li key={link.href} style={{ animationDelay: `${i * 0.06}s` }}>
              <Link
                href={link.href}
                className={`${styles.mobileLink} ${pathname === link.href ? styles.active : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={`https://wa.me/${siteConfig.restaurant.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-primary ${styles.mobileCta}`}
        >
          Reserve via WhatsApp
        </a>
      </div>
    </header>
  );
}
