'use client';

import React, { useState } from 'react';
import styles from './HomeScreen.module.css';
import { Card } from '@/components/Card/Card';
import { Button } from '@/components/Button/Button';
import { useAppContext } from '@/context/AppContext';
import { ALL_CATEGORIES, Category } from '@/data';
import { TestDirection } from '@/context/AppContext';
import { LevelSelectModal } from '@/components/LevelSelectModal/LevelSelectModal';


export function HomeScreen() {
  const { state, dispatch } = useAppContext();
  const { config } = state;

  const [showLevelModal, setShowLevelModal] = useState(false);

  const handleOpenModal = () => setShowLevelModal(true);
  const handleCloseModal = () => setShowLevelModal(false);
  const handleConfirmLevel = () => {
    setShowLevelModal(false);
    dispatch({ type: 'SET_SCREEN', screen: 'setup' });
  };

  return (
    <div className={styles.container}>
      {showLevelModal && (
        <LevelSelectModal onConfirm={handleConfirmLevel} onClose={handleCloseModal} />
      )}
      {/* Ambient background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.content}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            <span className={styles.logoText}>VocabNeon</span>
          </div>
          <p className={styles.tagline}>Master English vocabulary with style</p>
        </header>


        {/* Config Panel */}
        <Card className={styles.configCard}>
          <h2 className={styles.configTitle}>Test Configuration</h2>

          {/* Category */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Category</label>
            <div className={styles.chipRow}>
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  id={`cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                  className={`${styles.chip} ${config.category === cat ? styles.chipActive : ''}`}
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_CONFIG',
                      config: { category: cat as Category },
                    })
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Direction */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Test Direction</label>
            <div className={styles.chipRow}>
              {(['en-vi', 'vi-en'] as TestDirection[]).map((dir) => (
                <button
                  key={dir}
                  id={`dir-${dir}`}
                  className={`${styles.chip} ${config.direction === dir ? styles.chipActive : ''}`}
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_CONFIG',
                      config: { direction: dir },
                    })
                  }
                >
                  {dir === 'en-vi' ? 'English → Vietnamese' : 'Vietnamese → English'}
                </button>
              ))}
            </div>
          </div>

        </Card>

        <Button
          id="start-test-btn"
          size="lg"
          onClick={handleOpenModal}
          className={styles.startBtn}
        >
          Start Test →
        </Button>
      </div>
    </div>
  );
}
