'use client';

import React from 'react';
import { Friend } from '@/types/achievements';
import styles from './CompareDropdown.module.css';

interface CompareDropdownProps {
  friends: Friend[];
  selectedFriendId: string | null;
  onFriendSelect: (friendId: string | null) => void;
}

export function CompareDropdown({ friends, selectedFriendId, onFriendSelect }: CompareDropdownProps) {
  const selectedFriend = selectedFriendId ? friends.find(f => f.id === selectedFriendId) : null;

  return (
    <div className={styles.container}>
      <label className={styles.label}>Comparar com</label>
      <div className={styles.selector}>
        <select
          className={styles.select}
          value={selectedFriendId || ''}
          onChange={(e) => onFriendSelect(e.target.value || null)}
          aria-label="Selecionar amigo para comparar"
        >
          <option value="">Nenhum</option>
          {friends.map((friend) => (
            <option key={friend.id} value={friend.id}>
              {friend.name}
            </option>
          ))}
        </select>
        <span className={styles.icon}>▼</span>
      </div>
    </div>
  );
}

