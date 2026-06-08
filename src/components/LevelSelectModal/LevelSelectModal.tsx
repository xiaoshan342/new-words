'use client';

import React from 'react';
import styles from './LevelSelectModal.module.css';
import { CEFRLevel } from '@/data';
import { useAppContext } from '@/context/AppContext';

interface LevelSelectModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

const LEVELS: { value: CEFRLevel; label: string; desc: string; color: string }[] = [
  { value: 'Random', label: '🎲 Random', desc: 'Tất cả các level ngẫu nhiên', color: 'var(--purple)' },
  { value: 'A1', label: 'A1', desc: 'Beginner', color: '#4ade80' },
  { value: 'A2', label: 'A2', desc: 'Elementary', color: '#34d399' },
  { value: 'B1', label: 'B1', desc: 'Intermediate', color: 'var(--cyan)' },
  { value: 'B2', label: 'B2', desc: 'Upper Intermediate', color: '#818cf8' },
  { value: 'C1', label: 'C1', desc: 'Advanced', color: 'var(--pink)' },
];

export function LevelSelectModal({ onConfirm, onClose }: LevelSelectModalProps) {
  const { state, dispatch } = useAppContext();
  const selectedLevel = state.config.level;

  const handleSelect = (level: CEFRLevel) => {
    dispatch({ type: 'UPDATE_CONFIG', config: { level } });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Chọn Level</h2>
          <p className={styles.subtitle}>
            Chọn cấp độ CEFR phù hợp với trình độ của bạn
          </p>
        </div>

        {/* Level Grid */}
        <div className={styles.grid}>
          {LEVELS.map(({ value, label, desc, color }) => (
            <button
              key={value}
              id={`level-${value.toLowerCase()}`}
              className={`${styles.levelCard} ${selectedLevel === value ? styles.selected : ''}`}
              style={selectedLevel === value ? { borderColor: color, boxShadow: `0 0 20px ${color}40` } : {}}
              onClick={() => handleSelect(value)}
            >
              <span className={styles.levelBadge} style={{ color }}>
                {label}
              </span>
              <span className={styles.levelDesc}>{desc}</span>
              {selectedLevel === value && (
                <span className={styles.checkmark} style={{ color }}>✓</span>
              )}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Huỷ
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Bắt đầu →
          </button>
        </div>
      </div>
    </div>
  );
}
