'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Flame, ArrowLeft, Download, Search } from 'lucide-react';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/app/components/ui/AnimateOnScroll';
import menuData from '@/data/menus.json';
import { getItemImage } from '@/data/itemImages';
import styles from './menu.module.css';

export default function MenuPage() {
  const params = useParams();
  const { slug } = params;
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const menuType = menuData.menuTypes.find((m) => m.slug === slug);

  if (!menuType) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h1>Menu Not Found</h1>
          <p>The menu you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="btn btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const categories = menuType.categories;
  const activeCat = activeCategory || categories[0]?.id;

  const filteredCategories = searchQuery
    ? categories.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
      })).filter((cat) => cat.items.length > 0)
    : categories.filter((cat) => cat.id === activeCat);

  const pdfMap = {
    'smoke-house': '/menus/Smoke house menu.pdf',
    'bangla-kuthir': '/menus/Bangla Kuthir.pdf',
    'pushkin': '/menus/Pushikn Menu.pdf',
    'beverages': '/menus/Home page menu.pdf',
  };

  return (
    <div className={styles.menuPage}>
      {/* Hero */}
      <section className={styles.menuHero}>
        <div className={styles.menuHeroOverlay}></div>
        <div className={`container ${styles.menuHeroContent}`}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className={styles.menuBadge}>{menuType.icon}</div>
          <h1 className={styles.menuTitle}>{menuType.name}</h1>
          <p className={styles.menuDesc}>{menuType.description}</p>
        </div>
      </section>

      {/* Menu Content */}
      <section className={`section ${styles.menuContent}`}>
        <div className="container">
          {/* Search & Filter Bar */}
          <AnimateOnScroll>
            <div className={styles.menuControls}>
              <div className={styles.searchBar}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              {!searchQuery && (
                <div className={styles.categoryTabs}>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`${styles.categoryTab} ${activeCat === cat.id ? styles.tabActive : ''}`}
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </AnimateOnScroll>

          {/* Menu Items */}
          {filteredCategories.map((cat) => (
            <div key={cat.id} className={styles.categorySection}>
              <AnimateOnScroll>
                <div className={styles.categoryHeader}>
                  <h2 className={styles.categoryName}>{cat.name}</h2>
                  {cat.description && (
                    <p className={styles.categoryDesc}>{cat.description}</p>
                  )}
                </div>
              </AnimateOnScroll>
              <StaggerContainer className={styles.itemsGrid}>
                {cat.items.map((item) => (
                  <StaggerItem key={item.id}>
                    <div className={`${styles.menuItem} ${item.featured ? styles.menuItemFeatured : ''}`}>
                      <div className={styles.itemImageWrapper}>
                        <Image 
                          src={getItemImage(item.id)} 
                          alt={item.name} 
                          fill 
                          style={{ objectFit: 'cover' }} 
                          className={styles.itemImage}
                          sizes="(max-width: 768px) 100vw, 300px" 
                        />
                      </div>
                      <div className={styles.itemContent}>
                        <div className={styles.itemTop}>
                          <div className={styles.itemIcon}>
                            <Flame size={16} />
                          </div>
                          <div className={styles.itemInfo}>
                            <h3 className={styles.itemName}>
                              {item.name}
                              {item.featured && <span className={styles.featuredBadge}>Popular</span>}
                            </h3>
                            {item.nameBn && (
                              <span className={styles.itemNameBn}>{item.nameBn}</span>
                            )}
                            {item.description && (
                              <p className={styles.itemDesc}>{item.description}</p>
                            )}
                          </div>
                        </div>
                        <div className={styles.itemBottom}>
                          <span className={styles.itemPrice}>
                            ৳{item.price}
                            {item.priceAlt && <span className={styles.priceAlt}> / ৳{item.priceAlt}</span>}
                          </span>
                          {item.unit && <span className={styles.itemUnit}>{item.unit}</span>}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          ))}

          {/* PDF Download */}
          {pdfMap[slug] && (
            <AnimateOnScroll className={styles.pdfDownload}>
              <a href={pdfMap[slug]} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Download size={16} /> Download PDF Menu
              </a>
            </AnimateOnScroll>
          )}
        </div>
      </section>
    </div>
  );
}
