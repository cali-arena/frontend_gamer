'use client';

import React from 'react';
import { Achievement } from '@/types/achievements';
import { useImageLoad } from '@/hooks/useImageLoad';
import styles from './AchievementTile.module.css';

interface AchievementTileProps {
  achievement: Achievement;
  onClick?: () => void;
  isSelected?: boolean;
  compact?: boolean;
}

export function AchievementTile({ 
  achievement, 
  onClick, 
  isSelected = false,
  compact = false 
}: AchievementTileProps) {
  const imageLoaded = useImageLoad(achievement.iconUrl);
  const showPlaceholder = !achievement.iconUrl || !imageLoaded;

  return (
    <div
      className={`${styles.tile} ${isSelected ? styles.selected : ''} ${compact ? styles.compact : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={onClick ? `Ver detalhes de ${achievement.name}` : undefined}
    >
      <div className={styles.iconContainer}>
        <div 
          className={`${styles.icon} ${achievement.isUnlocked ? styles.unlocked : styles.locked}`}
          style={{
            backgroundImage: imageLoaded && achievement.iconUrl ? `url(${achievement.iconUrl})` : 'none',
            backgroundColor: achievement.isUnlocked ? '#2a2a2a' : '#1a1a1a'
          }}
        >
          {showPlaceholder && (
            <span className={styles.iconPlaceholder}>🏆</span>
          )}
        </div>
        {achievement.isUnlocked && (
          <div className={styles.checkmark}>✓</div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{achievement.name}</h3>
        {!compact && achievement.progress !== undefined && !achievement.isUnlocked && (
          <div className={styles.progress}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${achievement.progress}%` }}
              />
            </div>
            <span className={styles.progressText}>{achievement.progress}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

