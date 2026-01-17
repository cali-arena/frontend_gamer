'use client';

import React, { useState } from 'react';
import { Achievement } from '@/types/achievements';
import { AchievementTile } from './AchievementTile';
import { AchievementsModal } from './AchievementsModal';
import styles from './ConquistasWidget.module.css';

interface ConquistasWidgetProps {
  achievements: Achievement[];
  gameName?: string;
  initialView?: 'compact' | 'list';
}

export function ConquistasWidget({ achievements, gameName = 'este jogo', initialView = 'compact' }: ConquistasWidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayedAchievements = achievements.slice(0, 3);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className={styles.widget}
        onClick={handleOpenModal}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpenModal();
          }
        }}
        aria-label="Ver conquistas"
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Conquistas neste jogo</h2>
          <button
            className={styles.verTudoButton}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal();
            }}
            aria-label="Ver todas as conquistas"
          >
            ver tudo
          </button>
        </div>
        <div className={styles.achievementsGrid}>
          {displayedAchievements.map((achievement) => (
            <AchievementTile
              key={achievement.id}
              achievement={achievement}
              compact={true}
            />
          ))}
        </div>
      </div>

      <AchievementsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        achievements={achievements}
        gameName={gameName}
        initialView={initialView}
      />
    </>
  );
}

