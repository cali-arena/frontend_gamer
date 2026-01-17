'use client';

import React from 'react';
import { Game } from '@/types/achievements';
import styles from './GameSelector.module.css';

interface GameSelectorProps {
  games: Game[];
  selectedGameId: string;
  onGameChange: (gameId: string) => void;
}

export function GameSelector({ games, selectedGameId, onGameChange }: GameSelectorProps) {
  const selectedGame = games.find(g => g.id === selectedGameId) || games[0];

  return (
    <div className={styles.selector}>
      <select
        className={styles.select}
        value={selectedGameId}
        onChange={(e) => onGameChange(e.target.value)}
        aria-label="Selecionar jogo"
      >
        {games.map((game) => (
          <option key={game.id} value={game.id}>
            {game.name}
          </option>
        ))}
      </select>
      <span className={styles.icon}>▼</span>
    </div>
  );
}

