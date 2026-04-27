import Image from 'next/image';
import styles from './OfferBillboard.module.css';
import { Phone, Globe } from 'lucide-react';
import { AnimateOnScroll } from './AnimateOnScroll';

export default function OfferBillboard({ offer }) {
  if (!offer || !offer.enabled) return null;

  return (
    <section className={styles.billboardSection}>
      <AnimateOnScroll>
        <div className={styles.billboardContainer}>
          {/* Background image or gradient */}
          <div className={styles.bgGlow} />
          
          <div className={styles.content}>
            <div className={styles.textContent}>
              {offer.tagline && <span className={styles.tagline}>{offer.tagline}</span>}
              <h2 className={styles.mainTitle}>
                <span className={styles.titleLine1}>{offer.title1}</span>
                {offer.titleSubtitle && <span className={styles.titleSubtitle}>{offer.titleSubtitle}</span>}
                <br />
                <span className={styles.titleLine2}>{offer.title2}</span>
              </h2>
              {offer.description && <p className={styles.description}>{offer.description}</p>}

              <div className={styles.contactInfo}>
                {offer.phone && (
                  <div className={styles.contactItem}>
                    <Phone size={16} />
                    <span>{offer.phone}</span>
                  </div>
                )}
                {offer.website && (
                  <div className={styles.contactItem}>
                    <Globe size={16} />
                    <span>{offer.website}</span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.imageContent}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={offer.image} 
                  alt={offer.title1} 
                  fill 
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              {offer.badgeText && (
                <div className={styles.badge}>
                  <div className={styles.badgeInner}>
                    <span>{offer.badgeText.split(' ')[0]}</span>
                    <span>{offer.badgeText.split(' ').slice(1).join(' ')}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
