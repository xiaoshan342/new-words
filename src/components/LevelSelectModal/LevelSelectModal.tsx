'use client';

import React, { useState } from 'react';
import styles from './LevelSelectModal.module.css';
import { CEFRLevel } from '@/data';
import { useAppContext } from '@/context/AppContext';

interface LevelSelectModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

const LEVELS: { value: CEFRLevel; label: string; desc: string; color: string }[] = [
  { value: 'Random', label: '🎲 Random', desc: 'Tất cả các level', color: 'var(--purple)' },
  { value: 'A1', label: 'A1', desc: 'Beginner', color: '#4ade80' },
  { value: 'A2', label: 'A2', desc: 'Elementary', color: '#34d399' },
  { value: 'B1', label: 'B1', desc: 'Intermediate', color: 'var(--cyan)' },
  { value: 'B2', label: 'B2', desc: 'Upper-Intermediate', color: '#818cf8' },
  { value: 'C1', label: 'C1', desc: 'Advanced', color: 'var(--pink)' },
];

const PRESET_COUNTS = [10, 20, 50];

export function LevelSelectModal({ onConfirm, onClose }: LevelSelectModalProps) {
  const { state, dispatch } = useAppContext();
  const selectedLevel = state.config.level;
  const questionCount = state.config.questionCount;

  // Local state cho custom input text
  const [customInput, setCustomInput] = useState(
    PRESET_COUNTS.includes(questionCount) ? '' : String(questionCount)
  );

  const setCount = (n: number) => {
    dispatch({ type: 'UPDATE_CONFIG', config: { questionCount: n } });
  };

  const handlePresetClick = (n: number) => {
    setCustomInput('');
    setCount(n);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, ''); // chỉ cho phép số
    setCustomInput(raw);
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setCount(parsed);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Preset đang active nếu count khớp và custom input trống
  const isPresetActive = (n: number) =>
    questionCount === n && customInput === '';

  const canConfirm = questionCount > 0;

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} role="dialog" aria-modal="true">

        {/* ── Level ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Chọn Level</h2>
          <p className={styles.sectionSub}>Cấp độ CEFR phù hợp với trình độ của bạn</p>
          <div className={styles.levelGrid}>
            {LEVELS.map(({ value, label, desc, color }) => (
              <button
                key={value}
                id={`level-${value.toLowerCase()}`}
                className={`${styles.levelCard} ${selectedLevel === value ? styles.selected : ''}`}
                style={selectedLevel === value ? { borderColor: color, boxShadow: `0 0 18px ${color}40` } : {}}
                onClick={() => dispatch({ type: 'UPDATE_CONFIG', config: { level: value } })}
              >
                <span className={styles.levelBadge} style={{ color }}>{label}</span>
                <span className={styles.levelDesc}>{desc}</span>
                {selectedLevel === value && (
                  <span className={styles.checkmark} style={{ color }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Number of Questions ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Số câu hỏi</h2>
          <p className={styles.sectionSub}>Chọn nhanh hoặc nhập số tùy chỉnh</p>

          <div className={styles.countRow}>
            {PRESET_COUNTS.map((n) => (
              <button
                key={n}
                id={`count-${n}`}
                className={`${styles.countChip} ${isPresetActive(n) ? styles.countChipActive : ''}`}
                onClick={() => handlePresetClick(n)}
              >
                {n}
              </button>
            ))}

            <div className={styles.customWrap}>
              <input
                id="custom-count-input"
                type="text"
                inputMode="numeric"
                placeholder="Tùy chỉnh..."
                value={customInput}
                onChange={handleCustomChange}
                className={`${styles.customInput} ${customInput && !PRESET_COUNTS.includes(questionCount) ? styles.customInputActive : ''}`}
                maxLength={4}
              />
            </div>
          </div>

          {questionCount > 0 && (
            <p className={styles.countHint}>
              Đã chọn: <strong>{questionCount}</strong> câu
            </p>
          )}
        </div>

        {/* ── Actions ── */}
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Huỷ</button>
          <button
            className={styles.confirmBtn}
            onClick={onConfirm}
            disabled={!canConfirm}
          >
            Bắt đầu →
          </button>
        </div>
      </div>
    </div>
  );
}
