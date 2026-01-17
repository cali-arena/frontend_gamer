'use client';

import React from 'react';
import { Achievement } from '@/types/achievements';
import { useImageLoad } from '@/hooks/useImageLoad';
import styles from './AchievementDetail.module.css';

interface AchievementDetailProps {
  achievement: Achievement | null;
  onBack: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  onToggleWatched: () => void;
  onTogglePinned: () => void;
}

const rarityLabels: Record<string, string> = {
  common: 'Comum',
  uncommon: 'Incomum',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Lendário'
};

function formatDate(dateString?: string): string {
  if (!dateString) return '--';
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}h${minutes}`;
  } catch {
    return '--';
  }
}

export function AchievementDetail({
  achievement,
  onBack,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  onToggleWatched,
  onTogglePinned
}: AchievementDetailProps) {
  if (!achievement) {
    return (
      <div className={styles.detailView}>
        <div className={styles.emptyState}>
          <p>Conquista não encontrada</p>
        </div>
      </div>
    );
  }

  const imageLoaded = useImageLoad(achievement.iconUrl);
  const showPlaceholder = !achievement.iconUrl || !imageLoaded;

  return (
    <div className={styles.detailView}>
      <div className={styles.header}>
        <h2 className={styles.title}>{achievement.name}</h2>
        <button
          className={styles.closeButton}
          onClick={onBack}
          aria-label="Fechar detalhes"
        >
          ×
        </button>
      </div>

      <div className={styles.detailCard}>
        <div className={styles.cardHeader}>
          <div className={styles.iconContainer}>
            <div
              className={`${styles.icon} ${achievement.isUnlocked ? styles.iconUnlocked : styles.iconLocked}`}
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
        </div>

        <div className={styles.metadataGrid}>
          <div className={styles.metadataItem}>
            <span className={styles.label}>plataforma</span>
            <span className={styles.value}>{achievement.platform || 'Epic Games'}</span>
          </div>
          <div className={styles.metadataItem}>
            <span className={styles.label}>nickname</span>
            <span className={styles.value}>{achievement.nickname || 'joivitt'}</span>
          </div>
          <div className={styles.metadataItem}>
            <span className={styles.label}>evento</span>
            <span className={styles.value}>{achievement.event || '--'}</span>
          </div>
          <div className={styles.metadataItem}>
            <span className={styles.label}>data da conquista</span>
            <span className={styles.value}>{formatDate(achievement.unlockDate)}</span>
          </div>
          <div className={styles.metadataItem}>
            <span className={styles.label}>data de validade</span>
            <span className={styles.value}>{formatDate(achievement.expirationDate)}</span>
          </div>
          <div className={styles.metadataItem}>
            <span className={styles.label}>tipo de conquista</span>
            <span className={styles.value}>{rarityLabels[achievement.rarity] || achievement.rarity}</span>
          </div>
          <div className={styles.metadataItem}>
            <span className={styles.label}>% de players</span>
            <span className={styles.value}>
              {achievement.playerPercentage !== undefined 
                ? `${achievement.playerPercentage}%` 
                : '--'}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.actionBar}>
        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={onPrevious}
            disabled={!hasPrevious}
            aria-label="Conquista anterior"
          >
            ←
          </button>
          <button
            className={styles.navButton}
            onClick={onNext}
            disabled={!hasNext}
            aria-label="Próxima conquista"
          >
            →
          </button>
        </div>
        <div className={styles.actions}>
          <button
            className={`${styles.actionButton} ${achievement.isWatched ? styles.active : ''}`}
            onClick={onToggleWatched}
            aria-label={achievement.isWatched ? 'Desmarcar como vendo' : 'Marcar como vendo'}
            aria-pressed={achievement.isWatched}
          >
            marcar como vendo
          </button>
          <button
            className={`${styles.actionButton} ${achievement.isPinned ? styles.active : ''}`}
            onClick={onTogglePinned}
            aria-label={achievement.isPinned ? 'Desfixar' : 'Fixar'}
            aria-pressed={achievement.isPinned}
          >
            fixar
          </button>
        </div>
      </div>
    </div>
  );
}

