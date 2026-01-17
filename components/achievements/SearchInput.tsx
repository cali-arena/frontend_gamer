'use client';

import React from 'react';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Pesquisar conquista' }: SearchInputProps) {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>🔍</span>
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Pesquisar conquista"
      />
      {value && (
        <button
          className={styles.clearButton}
          onClick={() => onChange('')}
          aria-label="Limpar pesquisa"
        >
          ×
        </button>
      )}
    </div>
  );
}

