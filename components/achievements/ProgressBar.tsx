'use client';

import React, { useEffect, useState } from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  unlocked: number;
  total: number;
}

export function ProgressBar({ unlocked, total }: ProgressBarProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;

  // Smooth animation when percentage changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 50);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.count}>{unlocked} de {total} alcançados</span>
        <span className={styles.percentage}>{percentage}%</span>
      </div>
      <div className={styles.bar}>
        <div 
          className={styles.fill}
          style={{ width: `${animatedPercentage}%` }}
          role="progressbar"
          aria-valuenow={unlocked}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`${unlocked} de ${total} conquistas alcançadas`}
        />
      </div>
    </div>
  );
}

