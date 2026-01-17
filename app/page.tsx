'use client';

import { ConquistasWidget } from '@/components/achievements/ConquistasWidget';
import { getAchievementsByGame } from '@/data/mockAchievements';
import styles from './page.module.css';

export default function Home() {
  // Get Fortnite achievements for the widget
  const fortniteAchievements = getAchievementsByGame('fortnite');

  return (
    <main className={styles.main}>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <h1>Perfil</h1>
        </div>
        
        <div className={styles.profileContent}>
          {/* Profile sections would go here */}
          <div className={styles.section}>
            <ConquistasWidget achievements={fortniteAchievements} />
          </div>
        </div>
      </div>
    </main>
  );
}

