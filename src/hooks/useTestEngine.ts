'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { getRandomWords } from '@/data';

export type FeedbackState = 'idle' | 'correct' | 'wrong';

export function useTestEngine() {
  const { state, dispatch } = useAppContext();
  const { config, test } = state;

  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState>('idle');
  const [showFeedback, setShowFeedback] = useState(false);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuestion = test.questions[test.currentIndex] ?? null;
  const isLastQuestion = test.currentIndex >= test.questions.length - 1;
  const progress =
    test.questions.length > 0
      ? ((test.currentIndex) / test.questions.length) * 100
      : 0;

  // Chọn ngẫu nhiên 1 nghĩa tiếng Việt để hiển thị khi hướng vi-en
  const [displayViIndex, setDisplayViIndex] = useState(0);
  useEffect(() => {
    if (currentQuestion && currentQuestion.vi.length > 0) {
      setDisplayViIndex(Math.floor(Math.random() * currentQuestion.vi.length));
    }
  }, [currentQuestion?.id]);

  const getDisplayWord = useCallback(() => {
    if (!currentQuestion) return '';
    if (config.direction === 'en-vi') return currentQuestion.en;
    // vi-en: chỉ hiển thị 1 nghĩa được chọn ngẫu nhiên
    return currentQuestion.vi[displayViIndex] ?? currentQuestion.vi[0];
  }, [currentQuestion, config.direction, displayViIndex]);

  // Trả về string để hiển thị (join các nghĩa bằng " / ")
  const getCorrectAnswer = useCallback(() => {
    if (!currentQuestion) return '';
    if (config.direction === 'en-vi') {
      return currentQuestion.vi.join(' / ');
    }
    return currentQuestion.en;
  }, [currentQuestion, config.direction]);

  const submitAnswer = useCallback(() => {
    if (!currentQuestion || showFeedback) return;

    const userAnswer = inputValue.trim().toLowerCase();

    // Kiểm tra đáp án: chấp nhận bất kỳ nghĩa nào trong mảng vi[]
    const isCorrect =
      config.direction === 'en-vi'
        ? currentQuestion.vi.some((v) => v.trim().toLowerCase() === userAnswer)
        : currentQuestion.en.trim().toLowerCase() === userAnswer;


    if (isCorrect) {
      dispatch({ type: 'ANSWER_CORRECT' });
      setFeedback('correct');
    } else {
      dispatch({ type: 'ANSWER_WRONG', userAnswer });
      setFeedback('wrong');
    }

    setShowFeedback(true);
    setInputValue('');

    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => {
      setShowFeedback(false);
      setFeedback('idle');

      if (isLastQuestion) {
        dispatch({ type: 'FINISH_TEST' });
      } else {
        dispatch({ type: 'NEXT_QUESTION' });
      }
    }, 1200);
  }, [
    currentQuestion,
    inputValue,
    showFeedback,
    getCorrectAnswer,
    dispatch,
    isLastQuestion,
  ]);

  const startTest = useCallback(() => {
    const questions = getRandomWords(config.category, config.level, config.questionCount);
    dispatch({ type: 'START_TEST', questions });
  }, [config, dispatch]);

  const restartTest = useCallback(() => {
    dispatch({ type: 'RESET_TEST' });
  }, [dispatch]);

  return {
    // state
    currentQuestion,
    inputValue,
    feedback,
    showFeedback,
    progress,
    isLastQuestion,
    test,
    config,
    // actions
    setInputValue,
    submitAnswer,
    startTest,
    restartTest,
    getDisplayWord,
    getCorrectAnswer,
  };
}
