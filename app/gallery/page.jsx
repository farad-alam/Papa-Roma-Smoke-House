'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/app/components/ui/AnimateOnScroll';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './gallery.module.css';

const galleryItems = [
  { id: 1, category: 'food', title: 'Smoked Beef Brisket', image: '/images/hero-brisket.png' },
  { id: 2, category: 'food', title: 'Bengali Cuisine', image: '/images/food-bengali.png' },
  { id: 3, category: 'ambiance', title: 'Lakeside Evening', image: '/images/hero-ambiance.png' },
  { id: 4, category: 'food', title: 'Dessert Collection', image: '/images/food-dessert.png' },
  { id: 5, category: 'ambiance', title: 'Restaurant Exterior', image: '/images/restaurant-exterior.png' },
  { id: 6, category: 'food', title: 'Italian Beef Steak', image: '/images/food-pasta.png' },
  { id: 7, category: 'food', title: 'Smoked Meat Platter', image: '/images/hero-platter.png' },
  { id: 8, category: 'food', title: 'BBQ Grill', image: '/images/gallery-grill.png' },
  { id: 9, category: 'food', title: 'Vibrant Mocktails', image: '/images/food-drinks.png' },
  { id: 10, category: 'food', title: 'Gourmet Burger', image: '/images/food-burger.png' },
  { id: 11, category: 'ambiance', title: 'Chef at Work', image: '/images/about-cooking.png' },
  { id: 12, category: 'food', title: 'Smoked Perfection', image: '/images/hero-brisket.png' },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food' },
  { id: 'ambiance', label: 'Ambiance' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === filter);

  return (
    <div className={styles.galleryPage}>
      {/* Hero */}
      <section className={styles.galleryHero}>
        <div className={styles.heroImage}>
          <Image src="/images/hero-ambiance.png" alt="Gallery" fill style={{ objectFit: 'cover', opacity: 0.2 }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-label">Visual Journey</span>
          <h1 className={styles.galleryTitle}>Our <span className="gold-text">Gallery</span></h1>
          <p className={styles.gallerySubtitle}>A glimpse into the Papa Roma experience</p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className={`section ${styles.galleryContent}`}>
        <div className="container">
          <AnimateOnScroll>
            <div className={styles.filters}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.filterBtn} ${filter === cat.id ? styles.filterActive : ''}`}
                  onClick={() => setFilter(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </AnimateOnScroll>

          <StaggerContainer className={styles.galleryGrid}>
            {filtered.map((item) => (
              <StaggerItem key={item.id}>
                <div className={styles.galleryCard} onClick={() => setLightbox(item)}>
                  <div className={styles.galleryImage}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                  <div className={styles.galleryOverlay}>
                    <span className={styles.galleryCategory}>{item.category}</span>
                    <h3 className={styles.galleryItemTitle}>{item.title}</h3>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className={styles.lightbox}
            onClick={() => setLightbox(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>
              <X size={24} />
            </button>
            <motion.div
              className={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className={styles.lightboxImage}>
                <Image
                  src={lightbox.image}
                  alt={lightbox.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  quality={95}
                />
              </div>
              <div className={styles.lightboxInfo}>
                <span className={styles.galleryCategory}>{lightbox.category}</span>
                <h3>{lightbox.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
