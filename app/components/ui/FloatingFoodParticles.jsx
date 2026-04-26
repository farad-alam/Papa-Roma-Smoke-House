'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './FloatingFoodParticles.module.css';

const FOOD_EMOJIS = ['🍔', '🍕', '🍝', '🥩'];

export default function FloatingFoodParticles() {
  const [particles, setParticles] = useState([]);
  const { scrollY } = useScroll();
  
  // Scale down from 1.5 at the top of the page to 0.7 when scrolled down far
  const scale = useTransform(scrollY, [0, 5000], [1.5, 0.7]);

  useEffect(() => {
    // Generate only 4 large particles
    const newParticles = Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      emoji: FOOD_EMOJIS[i % FOOD_EMOJIS.length], 
      size: Math.random() * 80 + 120, // 120px to 200px
      left: Math.random() * 80 + 10, // Keep slightly away from edges
      top: Math.random() * 80 + 10, 
      duration: Math.random() * 40 + 50, // 50s to 90s very slow float
      delay: Math.random() * -50, 
      rotateDirection: Math.random() > 0.5 ? 360 : -360,
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className={styles.container}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={styles.particle}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}px`,
            scale: scale, // Dynamic scale based on scroll position
          }}
          animate={{
            y: [0, -250, 250, 0], // Larger drifting distance
            x: [0, 200, -200, 0], 
            rotate: [0, p.rotateDirection], 
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
