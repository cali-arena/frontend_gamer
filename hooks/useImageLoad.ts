'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to handle image loading with error handling
 * Returns whether the image loaded successfully
 */
export function useImageLoad(imageUrl: string | undefined): boolean {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') {
      return;
    }

    if (!imageUrl) {
      setImageLoaded(false);
      setImageError(false);
      return;
    }

    // Reset states
    setImageLoaded(false);
    setImageError(false);

    // Try to load the image
    try {
      const img = new Image();
      
      img.onload = () => {
        setImageLoaded(true);
        setImageError(false);
      };
      
      img.onerror = () => {
        setImageLoaded(false);
        setImageError(true);
      };
      
      img.src = imageUrl;

      return () => {
        img.onload = null;
        img.onerror = null;
      };
    } catch (error) {
      // If Image constructor fails, treat as error
      setImageLoaded(false);
      setImageError(true);
    }
  }, [imageUrl]);

  return imageLoaded && !imageError;
}

