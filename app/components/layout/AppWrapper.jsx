'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '../ui/LoadingScreen';
import SmoothScroll from './SmoothScroll';

export default function AppWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if user has seen the loading screen in this session
    const hasLoaded = sessionStorage.getItem('papa-roma-loaded');
    if (hasLoaded) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
    setShowContent(true);
    sessionStorage.setItem('papa-roma-loaded', 'true');
  };

  return (
    <SmoothScroll>
      {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}
      <div style={{
        opacity: showContent ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        {children}
      </div>
    </SmoothScroll>
  );
}
