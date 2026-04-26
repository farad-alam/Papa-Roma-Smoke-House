'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'reveal' | 'done'

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate towards the end
        const increment = prev < 60 ? 2 : prev < 85 ? 3 : 5;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setPhase('reveal'), 400);
      setTimeout(() => {
        setPhase('done');
        onComplete?.();
      }, 1600);
    }
  }, [progress, onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className={styles.overlay}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background embers */}
          <div className={styles.embers}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={styles.ember}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                }}
              />
            ))}
          </div>

          <div className={styles.content}>
            {/* Fire icon animation */}
            <motion.div
              className={styles.fireIcon}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <svg viewBox="0 0 24 24" fill="none" className={styles.fireSvg}>
                <path
                  d="M12 23C16.5 23 20 19.5 20 15C20 11.5 18.5 9 16.5 7C16 6.5 15 7 15 7.5C15 9 14 10 13 10C12 10 11.5 9 12 7C12.5 5 11 2 9 1C8.5 0.5 8 1 8 1.5C8 4 6 6 4 8C2 10 2 12 2 14C2 18.5 6 23 12 23Z"
                  fill="url(#fireGrad)"
                />
                <defs>
                  <linearGradient id="fireGrad" x1="12" y1="1" x2="12" y2="23" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFAB40" />
                    <stop offset="0.5" stopColor="#E63946" />
                    <stop offset="1" stopColor="#8B0000" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Restaurant name */}
            <motion.div
              className={styles.nameContainer}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className={styles.name}>Papa Roma</h1>
              <div className={styles.subContainer}>
                <div className={styles.line}></div>
                <span className={styles.subtitle}>Smoke House</span>
                <div className={styles.line}></div>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Where Smoke Meets Flavor
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className={styles.progressContainer}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div className={styles.progressTrack}>
                <motion.div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={styles.progressText}>{progress}%</span>
            </motion.div>
          </div>

          {/* Curtain reveal */}
          {phase === 'reveal' && (
            <>
              <motion.div
                className={`${styles.curtain} ${styles.curtainLeft}`}
                initial={{ x: 0 }}
                animate={{ x: '-100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div
                className={`${styles.curtain} ${styles.curtainRight}`}
                initial={{ x: 0 }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
