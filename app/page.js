'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Flame, ArrowRight, Star, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from './components/ui/AnimateOnScroll';
import siteConfig from '@/data/siteConfig.json';
import menuData from '@/data/menus.json';
import testimonialData from '@/data/testimonials.json';
import styles from './page.module.css';
import FloatingFoodParticles from './components/ui/FloatingFoodParticles';

/* ===================== HERO SLIDER ===================== */
const heroSlides = [
  {
    image: '/images/hero-brisket.png',
    title: ['Where', 'Smoke', 'Meets', 'Flavor'],
    subtitle: 'Premium wood-smoked BBQ crafted with passion at Dhanmondi\'s lakeside',
  },
  {
    image: '/images/hero-platter.png',
    title: ['Taste', 'the', 'Art of', 'Fire'],
    subtitle: 'From Texas-style brisket to authentic Bengali specialties — a culinary journey',
  },
  {
    image: '/images/hero-ambiance.png',
    title: ['Dine', 'by', 'the', 'Lake'],
    subtitle: 'An unforgettable dining experience with four unique menus under one roof',
  },
];

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 2500);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <section className={styles.hero}>
      {/* Background image slider */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentSlide}
          className={styles.heroBgImage}
          initial={{ opacity: 0, scale: 1.1, x: direction > 0 ? 100 : -100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 1.05, x: direction > 0 ? -100 : 100 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={slide.image}
            alt="Papa Roma Smoke House"
            fill
            priority
            quality={90}
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark gradient overlay */}
      <div className={styles.heroOverlay}></div>

      {/* Smoke particles */}
      <div className={styles.smokeContainer}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.smoke} style={{
            left: `${15 + i * 14}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}></div>
        ))}
      </div>

      {/* Content */}
      <div className={`container ${styles.heroContent}`}>
        <motion.div
          className={styles.heroBadge}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Flame size={14} /> Dhanmondi Lakeside
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.h1
            key={`title-${currentSlide}`}
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            {slide.title[0]} <span className={styles.heroAccent}>{slide.title[1]}</span>{' '}
            {slide.title[2]} <span className={styles.heroGold}>{slide.title[3]}</span>
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${currentSlide}`}
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {slide.subtitle}
          </motion.p>
        </AnimatePresence>

        <div className={styles.heroCtas}>
          <Link href="/menu/smoke-house" className="btn btn-primary">
            Explore Menu <ArrowRight size={16} />
          </Link>
          <a
            href={`https://wa.me/${siteConfig.restaurant.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Reserve a Table
          </a>
        </div>

        {/* Slider controls */}
        <div className={styles.sliderControls}>
          <div className={styles.heroDots}>
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={`${styles.heroDot} ${i === currentSlide ? styles.heroDotActive : ''}`}
                onClick={() => { setDirection(i > currentSlide ? 1 : -1); setCurrentSlide(i); }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className={styles.heroStats}>
          <div className={styles.stat}><span className={styles.statNum}>4</span><span className={styles.statLabel}>Unique Menus</span></div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}><span className={styles.statNum}>80+</span><span className={styles.statLabel}>Dishes</span></div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}><span className={styles.statNum}>4★</span><span className={styles.statLabel}>Lakeside</span></div>
        </div>
      </div>

      <div className={styles.heroScrollIndicator}>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
}

/* ===================== MARQUEE ===================== */
function MarqueeSection() {
  const text = "PAPA ROMA SMOKE HOUSE — ";

  return (
    <section className={styles.marqueeContainer} aria-hidden="true">
      <div className={styles.marqueeText}>
        {/* Repeat 10 times to ensure it covers long widths correctly, transforming 50% loops it seamlessly */}
        {text.repeat(10)}
      </div>
    </section>
  );
}

/* ===================== HOT ITEMS ===================== */
function HotItemsSection() {
  const items = [
    {
      title: "The Papa Roma Platter",
      desc: "Our signature meat platter with brisket, ribs, and sausages.",
      image: "/images/hero-platter.png",
      large: true
    },
    {
      title: "Brisket Burger",
      desc: "Slow-smoked pulled brisket.",
      image: "/images/food-burger.png",
      large: false
    },
    {
      title: "Creamy Alfredo",
      desc: "Authentic Italian style.",
      image: "/images/food-pasta.png",
      large: false
    },
    {
      title: "Matcha Tiramisu",
      desc: "A fiery finish.",
      image: "/images/food-dessert.png",
      large: false
    }
  ];

  return (
    <section className={`section ${styles.hotItems}`}>
      <div className="container">
        <AnimateOnScroll>
          <div className="section-header">
            <span className="section-label">Trending Now</span>
            <h2 className="section-title">Hot <span className="gold-text">Picks</span></h2>
            <p className="section-subtitle">Our guests' absolute favorites this week</p>
          </div>
        </AnimateOnScroll>
        <StaggerContainer className={styles.hotGrid}>
          {items.map((item, idx) => (
            <StaggerItem key={idx} className={styles.hotCardWrapper}>
              <Link href="/menu/smoke-house" className={styles.hotCard}>
                <div className={styles.hotImage}>
                  <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className={styles.hotOverlay}>
                  <h3 className={styles.hotTitle}>{item.title}</h3>
                  <p className={styles.hotDesc}>{item.desc}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ===================== RECENT OFFER ===================== */
function OfferSection() {
  const { restaurant } = siteConfig;
  return (
    <section className={styles.offer}>
      <div className="container">
        <AnimateOnScroll>
          <div className={styles.offerCard}>
            <div className={styles.offerImage}>
              <Image src="/images/hero-brisket.png" alt="Special Offer" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 100vw" />
            </div>
            <div className={styles.offerOverlay}></div>
            <div className={styles.offerContent}>
              <span className={styles.offerBadge}>Limited Time Offer</span>
              <h2 className={styles.offerTitle}>Weekend <span className="gold-text">Fiesta</span></h2>
              <p className={styles.offerDesc}>
                Enjoy 20% off on our signature Smoke House Platters every weekend. Gather your friends and family for a riverside feast they won't forget.
              </p>
              <a href={`https://wa.me/${restaurant.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Claim Offer <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

/* ===================== MENU CATEGORIES ===================== */
const menuImages = {
  'smoke-house': '/images/hero-brisket.png',
  'bangla-kuthir': '/images/food-bengali.png',
  'pushkin': '/images/food-pasta.png',
  'beverages': '/images/food-drinks.png',
};

function MenuCategoriesSection() {
  return (
    <section className={`section ${styles.menuCategories}`}>
      <div className="container">
        <AnimateOnScroll>
          <div className="section-header">
            <span className="section-label">Our Kitchens</span>
            <h2 className="section-title">Four Culinary <span className="gold-text">Worlds</span></h2>
            <p className="section-subtitle">Each menu is a unique culinary journey, crafted by specialized chefs</p>
          </div>
        </AnimateOnScroll>
        <StaggerContainer className={styles.menuCatGrid}>
          {menuData.menuTypes.map((menu) => (
            <StaggerItem key={menu.id}>
              <Link href={`/menu/${menu.slug}`} className={styles.menuCatCard}>
                <div className={styles.menuCatImage}>
                  <Image
                    src={menuImages[menu.id] || '/images/hero-brisket.png'}
                    alt={menu.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className={styles.menuCatImageOverlay}></div>
                </div>
                <div className={styles.menuCatContent}>
                  <div className={styles.menuCatIcon}>{menu.icon}</div>
                  <h3 className={styles.menuCatName}>{menu.name}</h3>
                  <p className={styles.menuCatDesc}>{menu.description}</p>
                  <span className={styles.menuCatLink}>
                    View Menu <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ===================== FEATURED DISHES ===================== */
const dishImages = {
  sm1: '/images/hero-brisket.png',
  sm2: '/images/gallery-grill.png',
  sm5: '/images/hero-platter.png',
  bs1: '/images/food-burger.png',
  bs4: '/images/food-burger.png',
  pl1: '/images/hero-platter.png',
  bl8: '/images/food-bengali.png',
  bl9: '/images/food-bengali.png',
  bl11: '/images/food-bengali.png',
  bm4: '/images/food-bengali.png',
  bm5: '/images/food-bengali.png',
  bm6: '/images/food-bengali.png',
  ps5: '/images/food-pasta.png',
  ps8: '/images/gallery-grill.png',
  pm2: '/images/food-pasta.png',
  pm4: '/images/food-pasta.png',
  pm8: '/images/hero-platter.png',
  mk4: '/images/food-drinks.png',
  mk9: '/images/food-drinks.png',
  mk12: '/images/food-drinks.png',
  ds4: '/images/food-dessert.png',
  ds6: '/images/food-dessert.png',
  ds8: '/images/food-dessert.png',
  ds12: '/images/food-dessert.png',
};

function FeaturedDishesSection() {
  const featuredItems = [];
  menuData.menuTypes.forEach((mt) => {
    mt.categories.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.featured) {
          featuredItems.push({ ...item, menuName: mt.name, categoryName: cat.name });
        }
      });
    });
  });
  const displayItems = featuredItems.slice(0, 8);

  return (
    <section className={`section ${styles.featured}`}>
      <div className="container">
        <AnimateOnScroll>
          <div className="section-header">
            <span className="section-label">Chef&apos;s Selection</span>
            <h2 className="section-title">Signature <span className="accent-text">Dishes</span></h2>
            <p className="section-subtitle">Handpicked favorites from each of our four menus</p>
          </div>
        </AnimateOnScroll>
        <StaggerContainer className={styles.featuredGrid}>
          {displayItems.map((item) => (
            <StaggerItem key={item.id}>
              <div className={styles.dishCard}>
                <div className={styles.dishImageWrapper}>
                  <Image
                    src={dishImages[item.id] || '/images/hero-brisket.png'}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className={styles.dishImageOverlay}></div>
                </div>
                <div className={styles.dishInfo}>
                  <span className={styles.dishMenu}>{item.menuName}</span>
                  <h4 className={styles.dishName}>{item.name}</h4>
                  {item.description && <p className={styles.dishDesc}>{item.description}</p>}
                  <div className={styles.dishBottom}>
                    <span className={styles.dishPrice}>
                      ৳{item.price}
                      {item.unit && <small> / {item.unit}</small>}
                    </span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <AnimateOnScroll className={styles.featuredCta}>
          <Link href="/menu/smoke-house" className="btn btn-secondary">
            View Full Menu <ArrowRight size={16} />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

/* ===================== TESTIMONIALS ===================== */
function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = testimonialData.testimonials.filter((t) => t.active);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className={`section ${styles.testimonials}`}>
      <div className={styles.testimonialBg}>
        <Image
          src="/images/restaurant-exterior.png"
          alt="Papa Roma Restaurant"
          fill
          style={{ objectFit: 'cover', opacity: 0.15 }}
        />
      </div>
      <div className="container">
        <AnimateOnScroll>
          <div className="section-header">
            <span className="section-label">What Guests Say</span>
            <h2 className="section-title">Loved by <span className="gold-text">Food Enthusiasts</span></h2>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <div className={styles.testimonialSlider}>
            <button className={styles.tSliderBtn} onClick={prev} aria-label="Previous"><ChevronLeft size={20} /></button>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className={styles.testimonialCard}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.stars}>
                  {[...Array(testimonials[currentIndex]?.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />
                  ))}
                </div>
                <p className={styles.testimonialText}>&ldquo;{testimonials[currentIndex]?.comment}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>{testimonials[currentIndex]?.name?.charAt(0)}</div>
                  <span className={styles.authorName}>{testimonials[currentIndex]?.name}</span>
                </div>
              </motion.div>
            </AnimatePresence>
            <button className={styles.tSliderBtn} onClick={next} aria-label="Next"><ChevronRight size={20} /></button>
          </div>
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button key={i} className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`} onClick={() => setCurrentIndex(i)} aria-label={`Testimonial ${i + 1}`} />
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

/* ===================== MAP & CTA ===================== */
function MapCtaSection() {
  const { restaurant } = siteConfig;
  return (
    <section className={`section ${styles.mapCta}`}>
      <div className="container">
        <div className={styles.mapGrid}>
          <AnimateOnScroll direction="left" className={styles.mapEmbed}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0!2d90.3754!3d23.7461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8a7a8c2e28d%3A0x0!2zMjPCsDQ0JzQ2LjAiTiA5MMKwMjInMzEuNCJF!5e0!3m2!1sen!2sbd!4v1600000000000"
              width="100%" height="400" style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Papa Roma Smoke House Location"
            ></iframe>
          </AnimateOnScroll>
          <AnimateOnScroll direction="right" className={styles.ctaContent}>
            <span className="section-label">Visit Us</span>
            <h2 className="section-title">Experience the <span className="gold-text">Magic</span></h2>
            <div className={styles.ctaDetails}>
              <div className={styles.ctaDetail}><MapPin size={20} className={styles.ctaIcon} /><div><h4>Location</h4><p>{restaurant.address}</p></div></div>
              <div className={styles.ctaDetail}><Clock size={20} className={styles.ctaIcon} /><div><h4>Hours</h4><p>{restaurant.hours}</p></div></div>
            </div>
            <div className={styles.ctaButtons}>
              <a href={`https://wa.me/${restaurant.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Reserve via WhatsApp</a>
              <Link href="/contact" className="btn btn-secondary">Contact Us</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

/* ===================== MAIN PAGE ===================== */
export default function HomePage() {
  return (
    <>
      <FloatingFoodParticles />
      <HeroSection />
      <MarqueeSection />
      <HotItemsSection />
      <OfferSection />
      <MenuCategoriesSection />
      <FeaturedDishesSection />
      <TestimonialsSection />
      <MapCtaSection />
    </>
  );
}
