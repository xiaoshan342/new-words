'use client';

import React, { useEffect, useState } from 'react';
import styles from './TestSetupScreen.module.css';
import { Card } from '@/components/Card/Card';
import { Button } from '@/components/Button/Button';
import { useAppContext } from '@/context/AppContext';
import { useTestEngine } from '@/hooks/useTestEngine';
import { getPoolStats } from '@/data';
import { loadWordMemory } from '@/utils/wordMemory';

export function TestSetupScreen() {
  const { dispatch } = useAppContext();
  const { config, startTest } = useTestEngine();
  const poolSize = getPoolStats(config.category, config.level).size;
  const [dueCount, setDueCount] = useState(0);
  const actualCount = Math.min(config.questionCount, poolSize);
  const canStart = poolSize > 0;

  useEffect(() => {
    setDueCount(getPoolStats(config.category, config.level, loadWordMemory()).due);
  }, [config.category, config.level]);

  const handleBack = () => dispatch({ type: 'SET_SCREEN', screen: 'home' });

  const directionLabel =
    config.direction === 'en-vi'
      ? 'English → Vietnamese'
      : 'Vietnamese → English';

  const rows = [
    { label: 'Mode', value: config.mode === 'match' ? 'Ghép cặp EN ↔ VI' : 'Gõ đáp án' },
    { label: 'Category', value: config.category },
    { label: 'Level', value: config.level === 'Random' ? '🎲 Random (tất cả level)' : config.level },
    ...(config.mode === 'type'
      ? [{ label: 'Direction', value: directionLabel }]
      : []),
    {
      label: 'Questions',
      value:
        actualCount < config.questionCount
          ? `${actualCount} question${actualCount === 1 ? '' : 's'} (hết pool ${poolSize})`
          : `${config.questionCount} question${config.questionCount === 1 ? '' : 's'}`,
    },
    {
      label: 'Review',
      value:
        dueCount > 0
          ? `${dueCount} từ sai sẽ được ưu tiên`
          : 'Chưa có từ sai trong pool này',
    },
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
            {canStart ? (
              config.mode === 'match' ? (
                <>
                  Chọn một nút tiếng Anh rồi một nút tiếng Việt để ghép cặp. Sai thì chọn lại; đúng thì cặp đó bị khóa.
                </>
              ) : (
                <>
                  Type your answer and press <kbd>Enter</kbd> or click Submit to check it. Answers are case-insensitive.
                </>
              )
            ) : (
              <>
                Không có từ nào cho <strong>{config.category}</strong>
                {config.level !== 'Random' ? ` · ${config.level}` : ''}. Chọn level hoặc category khác.
              </>
            )}
          </span>
        </div>

        <Button
          id="begin-test-btn"
          size="lg"
          onClick={() => startTest()}
          disabled={!canStart}
          className={styles.beginBtn}
        >
          Begin Test ⚡
        </Button>
      </div>
    </div>
  );
}
