'use client';

import React, { useEffect, useRef } from 'react';
import styles from './TestScreen.module.css';
import { Card } from '@/components/Card/Card';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { useTestEngine } from '@/hooks/useTestEngine';

export function TestScreen() {
  const {
    currentQuestion,
    inputValue,
    feedback,
    showFeedback,
    test,
    config,
    setInputValue,
    submitAnswer,
    getDisplayWord,
    getCorrectAnswer,
  } = useTestEngine();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!showFeedback) {
      inputRef.current?.focus();
    }
  }, [showFeedback, test.currentIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showFeedback) {
      submitAnswer();
    }
  };

  if (!currentQuestion) return null;

  const dirLabel =
    config.direction === 'en-vi'
      ? 'Translate to Vietnamese'
      : 'Translate to English';

  const questionNum = test.currentIndex + 1;
  const totalQuestions = test.questions.length;

  return (
    <div className={styles.container}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.content}>
        {/* Header bar */}
        <div className={styles.header}>
          <div className={styles.categoryTag}>{config.category}</div>
          <div className={styles.scoreTag}>
            ✓ {test.correctCount} correct
          </div>
        </div>

        {/* Progress */}
        <ProgressBar current={questionNum - 1} total={totalQuestions} />

        {/* Question Card */}
        <Card
          glow={
            feedback === 'correct'
              ? 'cyan'
              : feedback === 'wrong'
              ? 'pink'
              : 'none'
          }
          className={`${styles.questionCard} ${
            feedback === 'correct' ? styles.flashCorrect : ''
          } ${feedback === 'wrong' ? styles.flashWrong : ''}`}
        >
          <div className={styles.questionMeta}>
            <span className={styles.questionNum}>
              Question {questionNum} of {totalQuestions}
            </span>
            <span className={styles.dirLabel}>{dirLabel}</span>
          </div>

          <div className={styles.word}>{getDisplayWord()}</div>

          {showFeedback && feedback === 'wrong' && (
            <div className={styles.correctReveal}>
              Correct answer:{' '}
              <span className={styles.correctText}>{getCorrectAnswer()}</span>
            </div>
          )}

          {showFeedback && feedback === 'correct' && (
            <div className={styles.successMsg}>🎉 Correct!</div>
          )}
        </Card>

        {/* Answer Section */}
        <div className={styles.answerSection}>
          <Input
            ref={inputRef}
            id="answer-input"
            placeholder="Type your answer here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            state={feedback === 'idle' ? 'idle' : feedback}
            disabled={showFeedback}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />

          <Button
            id="submit-answer-btn"
            size="lg"
            onClick={submitAnswer}
            disabled={showFeedback || !inputValue.trim()}
            className={styles.submitBtn}
          >
            Submit
          </Button>
        </div>

        <p className={styles.hint}>Press Enter to submit</p>
      </div>
    </div>
  );
}
