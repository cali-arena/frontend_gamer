'use client';

import React from 'react';
import { AchievementCategory } from '@/types/achievements';
import styles from './CategoryTabs.module.css';

interface CategoryTabsProps {
  categories: { id: AchievementCategory | 'all'; label: string; icon: string }[];
  selectedCategory: AchievementCategory | 'all';
  onCategoryChange: (category: AchievementCategory | 'all') => void;
}

export function CategoryTabs({ categories, selectedCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              className={`${styles.tab} ${isSelected ? styles.selected : styles.inactive}`}
              onClick={() => onCategoryChange(category.id)}
              aria-label={`Filtrar por ${category.label}`}
              aria-pressed={isSelected}
            >
              <span className={styles.tabIcon}>{category.icon}</span>
              <span className={styles.tabLabel}>{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

