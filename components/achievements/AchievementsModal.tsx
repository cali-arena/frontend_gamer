'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Achievement, Game, Friend, ModalView, AchievementCategory } from '@/types/achievements';
import { Modal } from '@/components/ui/Modal';
import { AchievementTile } from './AchievementTile';
import { GameSelector } from './GameSelector';
import { CategoryTabs } from './CategoryTabs';
import { ProgressBar } from './ProgressBar';
import { SearchInput } from './SearchInput';
import { CompareDropdown } from './CompareDropdown';
import { AchievementListItem } from './AchievementListItem';
import { AchievementDetail } from './AchievementDetail';
import { getAchievementsByGame, getFriendAchievements } from '@/data/mockAchievements';
import { mockFriends } from '@/data/mockFriends';
import { mockGames } from '@/data/mockAchievements';
import styles from './AchievementsModal.module.css';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
  games?: Game[];
  gameName?: string;
  initialView?: ModalView;
}

const categoryConfig = [
  { id: 'all' as const, label: 'Todas', icon: '🏆' },
  { id: 'combat' as AchievementCategory, label: 'Combate', icon: '⚔️' },
  { id: 'exploration' as AchievementCategory, label: 'Exploração', icon: '🗺️' },
  { id: 'collection' as AchievementCategory, label: 'Coleção', icon: '📦' },
  { id: 'progression' as AchievementCategory, label: 'Progressão', icon: '📈' },
  { id: 'social' as AchievementCategory, label: 'Social', icon: '👥' },
  { id: 'special' as AchievementCategory, label: 'Especial', icon: '⭐' }
];

export function AchievementsModal({ 
  isOpen, 
  onClose, 
  achievements: initialAchievements,
  games = mockGames,
  gameName = 'este jogo',
  initialView = 'compact'
}: AchievementsModalProps) {
  const [view, setView] = useState<ModalView>(initialView);
  const [selectedGameId, setSelectedGameId] = useState(games[0]?.id || '');
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
  const [selectedAchievementId, setSelectedAchievementId] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [watchedAchievements, setWatchedAchievements] = useState<Set<string>>(new Set());
  const [pinnedAchievements, setPinnedAchievements] = useState<Set<string>>(new Set());
  const listRef = useRef<HTMLDivElement>(null);

  // Get achievements for selected game
  const gameAchievements = useMemo(() => {
    return getAchievementsByGame(selectedGameId);
  }, [selectedGameId]);

  // Get friend achievements mapping
  const friendAchievementsMap = useMemo(() => {
    return getFriendAchievements();
  }, []);

  // Filter achievements by category and search
  const filteredAchievements = useMemo(() => {
    let filtered = [...gameAchievements];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(ach => ach.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(ach => 
        ach.name.toLowerCase().includes(query) ||
        ach.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [gameAchievements, selectedCategory, searchQuery]);

  // Separate unlocked and locked achievements
  const unlockedAchievements = useMemo(() => {
    return filteredAchievements.filter(ach => ach.isUnlocked);
  }, [filteredAchievements]);

  const lockedAchievements = useMemo(() => {
    return filteredAchievements.filter(ach => !ach.isUnlocked);
  }, [filteredAchievements]);

  // Get friends who have each achievement
  const getFriendsForAchievement = useCallback((achievementId: string): Friend[] => {
    const friendIds = friendAchievementsMap[achievementId] || [];
    return mockFriends.filter(f => friendIds.includes(f.id));
  }, [friendAchievementsMap]);

  // Handle view changes
  const handleViewAll = () => {
    setView('list');
  };

  const handleAchievementClick = (achievementId: string) => {
    if (view === 'compact') {
      setSelectedAchievementId(achievementId);
      // Could navigate to detail view here
    } else if (view === 'list') {
      setIsLoading(true);
      setSelectedAchievementId(achievementId);
      // Simulate loading delay for smooth transition
      setTimeout(() => {
        setView('detail');
        setIsLoading(false);
      }, 150);
    }
  };

  const handleBackToList = () => {
    setIsLoading(true);
    setTimeout(() => {
      setView('list');
      setIsLoading(false);
    }, 150);
  };

  // Handle ESC key - close modal or go back to list
  useEffect(() => {
    if (!isOpen || view !== 'detail') return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation(); // Prevent Modal's ESC handler
        handleBackToList();
      }
    };

    document.addEventListener('keydown', handleEscape, true); // Use capture phase
    return () => document.removeEventListener('keydown', handleEscape, true);
  }, [isOpen, view]);

  const handleToggleWatched = () => {
    if (!selectedAchievementId) return;
    setWatchedAchievements(prev => {
      const next = new Set(prev);
      if (next.has(selectedAchievementId)) {
        next.delete(selectedAchievementId);
      } else {
        next.add(selectedAchievementId);
      }
      return next;
    });
  };

  const handleTogglePinned = () => {
    if (!selectedAchievementId) return;
    setPinnedAchievements(prev => {
      const next = new Set(prev);
      if (next.has(selectedAchievementId)) {
        next.delete(selectedAchievementId);
      } else {
        next.add(selectedAchievementId);
      }
      return next;
    });
  };

  // Get current achievement for detail view
  const currentAchievement = useMemo(() => {
    if (!selectedAchievementId) return null;
    const achievement = gameAchievements.find(a => a.id === selectedAchievementId);
    if (!achievement) return null;
    return {
      ...achievement,
      isWatched: watchedAchievements.has(achievement.id),
      isPinned: pinnedAchievements.has(achievement.id)
    };
  }, [selectedAchievementId, gameAchievements, watchedAchievements, pinnedAchievements]);

  // Get navigation indices
  const currentIndex = useMemo(() => {
    if (!selectedAchievementId) return -1;
    return filteredAchievements.findIndex(a => a.id === selectedAchievementId);
  }, [selectedAchievementId, filteredAchievements]);

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < filteredAchievements.length - 1;

  const handlePrevious = () => {
    if (!hasPrevious) return;
    const prevAchievement = filteredAchievements[currentIndex - 1];
    handleAchievementClick(prevAchievement.id);
  };

  const handleNext = () => {
    if (!hasNext) return;
    const nextAchievement = filteredAchievements[currentIndex + 1];
    handleAchievementClick(nextAchievement.id);
  };

  // Keyboard navigation for list view
  useEffect(() => {
    if (view !== 'list' || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex(prev => {
          const max = filteredAchievements.length - 1;
          return prev < max ? prev + 1 : prev;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter' && focusedIndex >= 0) {
        e.preventDefault();
        const achievement = filteredAchievements[focusedIndex];
        if (achievement) {
          handleAchievementClick(achievement.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, isOpen, focusedIndex, filteredAchievements]);

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[data-index]');
      const focusedItem = items[focusedIndex] as HTMLElement;
      if (focusedItem) {
        focusedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [focusedIndex]);

  // Reset focus when search/category changes
  useEffect(() => {
    setFocusedIndex(-1);
  }, [searchQuery, selectedCategory]);

  const handleGameChange = (gameId: string) => {
    setSelectedGameId(gameId);
    setSearchQuery('');
    setSelectedCategory('all');
    setFocusedIndex(-1);
  };

  // Render compact view (Page 2)
  const renderCompactView = () => (
    <div className={styles.modalContent}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.trophyIcon}>🏆</span>
          <h2 className={styles.title} id="modal-title">Conquistas neste jogo</h2>
        </div>
        <div className={styles.headerRight}>
          <button
            className={styles.verTudoButton}
            onClick={handleViewAll}
            aria-label="Ver todas as conquistas"
          >
            ver tudo
          </button>
          <button
            className={styles.editButton}
            onClick={() => {
              // TODO: Implement edit functionality
            }}
            aria-label="Editar conquistas"
          >
            ✏️
          </button>
        </div>
      </div>

      <div className={styles.achievementsRow}>
        {gameAchievements.slice(0, 3).map((achievement) => (
          <div key={achievement.id} className={styles.achievementWrapper}>
            <AchievementTile
              achievement={achievement}
              onClick={() => handleAchievementClick(achievement.id)}
              isSelected={selectedAchievementId === achievement.id}
            />
          </div>
        ))}
        {gameAchievements.length > 3 && (
          <button
            className={styles.navButton}
            onClick={handleViewAll}
            aria-label="Ver mais conquistas"
          >
            →
          </button>
        )}
      </div>
    </div>
  );

  // Render list view (Page 3)
  const renderListView = () => (
    <div className={styles.listViewContent}>
      <div className={styles.listHeader}>
        <h2 className={styles.listTitle} id="modal-title">Conquistas neste jogo</h2>
        <GameSelector
          games={games}
          selectedGameId={selectedGameId}
          onGameChange={handleGameChange}
        />
      </div>

      <CategoryTabs
        categories={categoryConfig}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <ProgressBar
        unlocked={unlockedAchievements.length}
        total={gameAchievements.length}
      />

      <div className={styles.searchAndCompare}>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
        />

        <CompareDropdown
          friends={mockFriends}
          selectedFriendId={selectedFriendId}
          onFriendSelect={setSelectedFriendId}
        />
      </div>

      <div className={styles.achievementsList} ref={listRef}>
        {unlockedAchievements.length > 0 && (
          <>
            {unlockedAchievements.map((achievement, index) => (
              <div key={achievement.id} data-index={index}>
                <AchievementListItem
                  achievement={achievement}
                  friendsWhoHaveIt={getFriendsForAchievement(achievement.id)}
                  selectedFriendId={selectedFriendId}
                  onClick={() => handleAchievementClick(achievement.id)}
                  isSelected={focusedIndex === index || selectedAchievementId === achievement.id}
                />
              </div>
            ))}
          </>
        )}

        {lockedAchievements.length > 0 && (
          <>
            <div className={styles.divider}>
              <span className={styles.dividerLabel}>Não alcançadas</span>
            </div>
            {lockedAchievements.map((achievement, index) => {
              const listIndex = unlockedAchievements.length + index;
              return (
                <div key={achievement.id} data-index={listIndex}>
                  <AchievementListItem
                    achievement={achievement}
                    friendsWhoHaveIt={getFriendsForAchievement(achievement.id)}
                    selectedFriendId={selectedFriendId}
                    onClick={() => handleAchievementClick(achievement.id)}
                    isSelected={focusedIndex === listIndex || selectedAchievementId === achievement.id}
                  />
                </div>
              );
            })}
          </>
        )}

        {filteredAchievements.length === 0 && (
          <div className={styles.emptyState}>
            <p>Nenhuma conquista encontrada</p>
          </div>
        )}
      </div>
    </div>
  );

  // Render detail view (Page 4)
  const renderDetailView = () => {
    if (isLoading) {
      return (
        <div className={styles.detailView}>
          <div className={styles.loadingState}>
            <p>Carregando...</p>
          </div>
        </div>
      );
    }

    return (
      <AchievementDetail
        achievement={currentAchievement}
        onBack={handleBackToList}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        onToggleWatched={handleToggleWatched}
        onTogglePinned={handleTogglePinned}
      />
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={view !== 'detail'}>
      <div className={`${styles.viewContainer} ${styles[`view-${view}`]}`}>
        {view === 'compact' && renderCompactView()}
        {view === 'list' && !isLoading && renderListView()}
        {view === 'list' && isLoading && (
          <div className={styles.loadingState}>
            <p>Carregando...</p>
          </div>
        )}
        {view === 'detail' && renderDetailView()}
      </div>
    </Modal>
  );
}
