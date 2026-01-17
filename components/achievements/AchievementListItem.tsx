'use client';

import React from 'react';
import { Achievement, Friend } from '@/types/achievements';
import { useImageLoad } from '@/hooks/useImageLoad';
import styles from './AchievementListItem.module.css';

interface AchievementListItemProps {
  achievement: Achievement;
  friendsWhoHaveIt: Friend[];
  selectedFriendId: string | null;
  onClick: () => void;
  isSelected?: boolean;
}

export function AchievementListItem({
  achievement,
  friendsWhoHaveIt,
  selectedFriendId,
  onClick,
  isSelected = false
}: AchievementListItemProps) {
  const showComparison = selectedFriendId !== null;
  const friendHasIt = selectedFriendId ? friendsWhoHaveIt.some(f => f.id === selectedFriendId) : false;
  const userHasIt = achievement.isUnlocked;
  const achievementImageLoaded = useImageLoad(achievement.iconUrl);
  const showAchievementPlaceholder = !achievement.iconUrl || !achievementImageLoaded;

  return (
    <div
      className={`${styles.item} ${isSelected ? styles.selected : ''} ${achievement.isUnlocked ? styles.unlocked : styles.locked}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`${achievement.name}: ${achievement.description}`}
    >
      <div className={styles.leftSection}>
        <div className={styles.iconContainer}>
          <div 
            className={`${styles.icon} ${achievement.isUnlocked ? styles.iconUnlocked : styles.iconLocked}`}
            style={{
              backgroundImage: achievementImageLoaded && achievement.iconUrl ? `url(${achievement.iconUrl})` : 'none',
              backgroundColor: achievement.isUnlocked ? '#2a2a2a' : '#1a1a1a'
            }}
          >
            {showAchievementPlaceholder && (
              <span className={styles.iconPlaceholder}>🏆</span>
            )}
          </div>
          {achievement.isUnlocked && (
            <div className={styles.checkmark}>✓</div>
          )}
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{achievement.name}</h3>
          <p className={styles.description}>{achievement.description}</p>
          {showComparison && (
            <div className={styles.comparison}>
              <span className={`${styles.indicator} ${userHasIt ? styles.userHas : styles.userNot}`}>
                Você {userHasIt ? '✓' : '✗'}
              </span>
              <span className={`${styles.indicator} ${friendHasIt ? styles.friendHas : styles.friendNot}`}>
                Amigo {friendHasIt ? '✓' : '✗'}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.progressIndicators}>
          {friendsWhoHaveIt.length > 0 ? (
            <>
              {friendsWhoHaveIt.slice(0, 3).map((friend) => (
                <FriendAvatarDot key={friend.id} friend={friend} />
              ))}
              {friendsWhoHaveIt.length > 3 && (
                <div className={styles.progressCount}>+{friendsWhoHaveIt.length - 3}</div>
              )}
            </>
          ) : (
            <div className={styles.noProgress}>—</div>
          )}
        </div>
      </div>
    </div>
  );
}

function FriendAvatarDot({ friend }: { friend: Friend }) {
  const avatarLoaded = useImageLoad(friend.avatarUrl);
  const showAvatarPlaceholder = !friend.avatarUrl || !avatarLoaded;
  
  return (
    <div
      className={styles.progressDot}
      title={friend.name}
      style={{
        backgroundImage: avatarLoaded && friend.avatarUrl ? `url(${friend.avatarUrl})` : 'none',
        backgroundColor: '#4a4a4a'
      }}
    >
      {showAvatarPlaceholder && (
        <span className={styles.dotPlaceholder}>
          {friend.name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
