"use client";

import React from "react";
import styles from "./ResultScreen.module.css";
import { Card } from "@/components/Card/Card";
import { Button } from "@/components/Button/Button";
import { useAppContext } from "@/context/AppContext";
import { useTestEngine } from "@/hooks/useTestEngine";

export function ResultScreen() {
  const { state } = useAppContext();
  const { restartTest } = useTestEngine();
  const { test } = state;

  const totalQuestions = test.questions.length;
  const correctCount = test.correctCount;
  const incorrectCount = totalQuestions - correctCount;
  const percentage =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const getGrade = () => {
    if (percentage >= 90)
      return { label: "Excellent! 🏆", color: "var(--green)" };
    if (percentage >= 70)
      return { label: "Good Job! 👍", color: "var(--cyan)" };
    if (percentage >= 50)
      return { label: "Keep Trying 💪", color: "var(--purple)" };
    return { label: "Needs Practice 📚", color: "var(--pink)" };
  };

  const grade = getGrade();

  return (
    <div className={styles.container}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.content}>
        {/* Title */}
        <div className={styles.header}>
          <h1 className={styles.title}>Test Complete!</h1>
          <p className={styles.gradeLabel} style={{ color: grade.color }}>
            {grade.label}
          </p>
        </div>

        {/* Score Card */}
        <Card glow="cyan" className={styles.scoreCard}>
          <div className={styles.scoreBig}>
            <span className={styles.scoreNum}>{correctCount}</span>
            <span className={styles.scoreDivider}>/</span>
            <span className={styles.scoreTotal}>{totalQuestions}</span>
          </div>
          <div className={styles.pctRing}>
            <svg viewBox="0 0 120 120" className={styles.ring}>
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - percentage / 100)}`}
                transform="rotate(-90 60 60)"
                className={styles.ringFill}
              />
              <defs>
                <linearGradient
                  id="scoreGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="var(--cyan)" />
                  <stop offset="100%" stopColor="var(--purple)" />
                </linearGradient>
              </defs>
            </svg>
            <div className={styles.pctText}>{percentage}%</div>
          </div>

          <div className={styles.statRow}>
            <div className={styles.stat}>
              <span
                className={styles.statNum}
                style={{ color: "var(--green)" }}
              >
                {correctCount}
              </span>
              <span className={styles.statLabel}>Correct</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum} style={{ color: "var(--pink)" }}>
                {incorrectCount}
              </span>
              <span className={styles.statLabel}>Incorrect</span>
            </div>
          </div>
        </Card>


        {/* Wrong Answers */}
        {test.wrongAnswers.length > 0 && (
          <Card className={styles.wrongCard}>
            <h2 className={styles.wrongTitle}>Review Mistakes</h2>
            <div className={styles.wrongList}>
              {test.wrongAnswers.map((wa, i) => (
                <div key={`wrong-${i}`} className={styles.wrongItem}>
                  <div className={styles.wrongWord}>
                    {wa.word.en}
                    <span className={styles.arrowIcon}>→</span>
                    <span className={styles.correctAnswer}>
                      {wa.word.vi.map((item, index) => (
                        <span key={index}>
                          {item}
                          {index !== wa.word.vi.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className={styles.yourAnswer}>
                    Your answer: &quot;{wa.userAnswer || "(empty)"}&quot;
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {test.wrongAnswers.length === 0 && (
          <div className={styles.perfectMsg}>
            🎯 Perfect score! You nailed every question!
          </div>
        )}

        <Button
          id="restart-test-btn"
          size="lg"
          onClick={restartTest}
          className={styles.restartBtn}
        >
          ↩ Restart Test
        </Button>
      </div>
    </div>
  );
}
