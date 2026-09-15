'use client';

import React from 'react';
import styles from './MatchScreen.module.css';
import { Card } from '@/components/Card/Card';
import { Button } from '@/components/Button/Button';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { useAppContext } from '@/context/AppContext';
import { useMatchEngine } from '@/hooks/useMatchEngine';

function tileClass(
  stylesMap: typeof styles,
  opts: {
    selected: boolean;
    matched: boolean;
    mismatch: boolean;
  }
): string {
  const parts = [stylesMap.tile];
  if (opts.matched) parts.push(stylesMap.tileMatched);
  else if (opts.mismatch) parts.push(stylesMap.tileMismatch);
  else if (opts.selected) parts.push(stylesMap.tileSelected);
  return parts.join(' ');
}

export function MatchScreen() {
  const { dispatch, state } = useAppContext();
  const {
    boardIndex,
    boardCount,
    enOrder,
    viOrder,
    viLabelById,
    selectedEn,
    selectedVi,
    mismatch,
    matchedIds,
    matchedCount,
    totalCount,
    selectEn,
    selectVi,
  } = useMatchEngine();

  if (totalCount === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.content}>
          <Card className={styles.hintCard}>
            <p className={styles.emptyTitle}>No words in this pool</p>
            <p className={styles.hint}>
              {state.config.category}
              {state.config.level !== 'Random' ? ` · ${state.config.level}` : ''} has no matching vocabulary.
            </p>
          </Card>
          <Button
            id="empty-match-back-btn"
            variant="secondary"
            onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'home' })}
          >
            ← Back home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.content}>
        <div className={styles.chrome}>
          <div className={styles.header}>
            <div className={styles.categoryTag}>{state.config.category}</div>
            <div className={styles.scoreTag}>✓ {state.test.correctCount}</div>
          </div>

          <ProgressBar current={matchedCount} total={totalCount} />

          <p className={styles.boardMeta}>
            {boardCount > 1
              ? `Bảng ${boardIndex + 1}/${boardCount} · Chọn 1 EN + 1 VI`
              : 'Chọn 1 English + 1 tiếng Việt'}
          </p>
        </div>

        <div className={styles.board}>
          <div className={styles.col}>
            <span className={styles.colTitle}>English</span>
            {enOrder.map((word) => (
              <button
                key={`en-${word.id}`}
                id={`match-en-${word.id}`}
                type="button"
                disabled={matchedIds.has(word.id)}
                className={tileClass(styles, {
                  selected: selectedEn === word.id,
                  matched: matchedIds.has(word.id),
                  mismatch: mismatch?.en === word.id,
                })}
                onClick={() => selectEn(word.id)}
              >
                {word.en}
              </button>
            ))}
          </div>

          <div className={styles.col}>
            <span className={styles.colTitle}>Tiếng Việt</span>
            {viOrder.map((word) => (
              <button
                key={`vi-${word.id}`}
                id={`match-vi-${word.id}`}
                type="button"
                disabled={matchedIds.has(word.id)}
                className={tileClass(styles, {
                  selected: selectedVi === word.id,
                  matched: matchedIds.has(word.id),
                  mismatch: mismatch?.vi === word.id,
                })}
                onClick={() => selectVi(word.id)}
              >
                {viLabelById[word.id] ?? word.vi[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
