'use client';

import React from 'react';
import styles from './TestSetupScreen.module.css';
import { Card } from '@/components/Card/Card';
import { Button } from '@/components/Button/Button';
import { useAppContext } from '@/context/AppContext';
import { useTestEngine } from '@/hooks/useTestEngine';

export function TestSetupScreen() {
  const { dispatch } = useAppContext();
  const { config, startTest } = useTestEngine();

  const handleBack = () => dispatch({ type: 'SET_SCREEN', screen: 'home' });

  const directionLabel =
    config.direction === 'en-vi'
      ? 'English → Vietnamese'
      : 'Vietnamese → English';

  const rows = [
    { label: 'Category', value: config.category },
    { label: 'Level', value: config.level === 'Random' ? '🎲 Random (tất cả level)' : config.level },
    { label: 'Direction', value: directionLabel },
    { label: 'Questions', value: `${config.questionCount} questions` },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.content}>
        <button className={styles.backBtn} onClick={handleBack} id="back-to-home">
          ← Back
        </button>

        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Ready to Test?</h1>
          <p className={styles.subtitle}>Review your configuration below</p>
        </div>

        <Card glow="purple" className={styles.configCard}>
          <div className={styles.configTable}>
            {rows.map((row) => (
              <div key={row.label} className={styles.configRow}>
                <span className={styles.configLabel}>{row.label}</span>
                <span className={styles.configValue}>{row.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className={styles.tipBox}>
          <span className={styles.tipIcon}>💡</span>
          <span className={styles.tipText}>
            Type your answer and press <kbd>Enter</kbd> or click Submit to check it. Answers are case-insensitive.
          </span>
        </div>

        <Button
          id="begin-test-btn"
          size="lg"
          onClick={startTest}
          className={styles.beginBtn}
        >
          Begin Test ⚡
        </Button>
      </div>
    </div>
  );
}
