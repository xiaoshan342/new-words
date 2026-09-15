'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { shuffleArray, VocabWord } from '@/data';
import { useAppContext } from '@/context/AppContext';
import { recordAnswer } from '@/utils/wordMemory';

export const MATCH_BOARD_SIZE = 10;

function chunkWords(words: VocabWord[], size: number): VocabWord[][] {
  const boards: VocabWord[][] = [];
  for (let i = 0; i < words.length; i += size) {
    boards.push(words.slice(i, i + size));
  }
  return boards;
}

function pickViLabel(word: VocabWord): string {
  if (word.vi.length === 0) return word.en;
  return word.vi[Math.floor(Math.random() * word.vi.length)] ?? word.vi[0];
}

export function useMatchEngine() {
  const { state, dispatch } = useAppContext();
  const questions = state.test.questions;
  const questionsKey = questions.map((q) => q.id).join('|');

  const boards = useMemo(
    () => chunkWords(questions, MATCH_BOARD_SIZE),
    [questions]
  );

  const [boardIndex, setBoardIndex] = useState(0);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(() => new Set());
  const [enOrder, setEnOrder] = useState<VocabWord[]>([]);
  const [viOrder, setViOrder] = useState<VocabWord[]>([]);
  const [viLabelById, setViLabelById] = useState<Record<string, string>>({});
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [selectedVi, setSelectedVi] = useState<string | null>(null);
  const [mismatch, setMismatch] = useState<{ en: string; vi: string } | null>(null);

  const failedRef = useRef<Set<string>>(new Set());
  const lockRef = useRef(false);
  const matchedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    failedRef.current = new Set();
    matchedRef.current = new Set();
    lockRef.current = false;
    setMatchedIds(new Set());
    setBoardIndex(0);
    setSelectedEn(null);
    setSelectedVi(null);
    setMismatch(null);
  }, [questionsKey]);

  useEffect(() => {
    const board = boards[boardIndex] ?? [];
    setEnOrder(shuffleArray(board));
    setViOrder(shuffleArray(board));
    const labels: Record<string, string> = {};
    for (const word of board) {
      labels[word.id] = pickViLabel(word);
    }
    setViLabelById(labels);
    setSelectedEn(null);
    setSelectedVi(null);
    setMismatch(null);
    lockRef.current = false;
  }, [boards, boardIndex]);

  useEffect(() => {
    const board = boards[boardIndex] ?? [];
    if (board.length === 0) return;
    if (!board.every((w) => matchedIds.has(w.id))) return;

    const timer = setTimeout(() => {
      if (boardIndex >= boards.length - 1) {
        dispatch({ type: 'FINISH_TEST' });
      } else {
        setBoardIndex((i) => i + 1);
      }
    }, 650);

    return () => clearTimeout(timer);
  }, [matchedIds, boardIndex, boards, dispatch]);

  const resolvePair = useCallback(
    (enId: string, viId: string) => {
      if (lockRef.current) return;
      const enWord = questions.find((q) => q.id === enId);
      const viWord = questions.find((q) => q.id === viId);
      if (!enWord || !viWord) return;

      if (enId === viId) {
        if (matchedRef.current.has(enId)) return;
        recordAnswer(enWord.en, true);
        if (!failedRef.current.has(enId)) {
          dispatch({ type: 'ANSWER_CORRECT' });
        }
        const next = new Set(matchedRef.current);
        next.add(enId);
        matchedRef.current = next;
        setMatchedIds(next);
        setSelectedEn(null);
        setSelectedVi(null);
        return;
      }

      lockRef.current = true;
      setMismatch({ en: enId, vi: viId });
      if (!failedRef.current.has(enId)) {
        failedRef.current.add(enId);
        recordAnswer(enWord.en, false);
        dispatch({
          type: 'ANSWER_WRONG',
          userAnswer: viLabelById[viId] ?? viWord.vi[0] ?? viWord.en,
          word: enWord,
        });
      }

      window.setTimeout(() => {
        setMismatch(null);
        setSelectedEn(null);
        setSelectedVi(null);
        lockRef.current = false;
      }, 520);
    },
    [questions, dispatch, viLabelById]
  );

  const selectEn = useCallback(
    (id: string) => {
      if (lockRef.current || matchedRef.current.has(id)) return;
      if (selectedEn === id) {
        setSelectedEn(null);
        return;
      }
      setSelectedEn(id);
      if (selectedVi) resolvePair(id, selectedVi);
    },
    [selectedEn, selectedVi, resolvePair]
  );

  const selectVi = useCallback(
    (id: string) => {
      if (lockRef.current || matchedRef.current.has(id)) return;
      if (selectedVi === id) {
        setSelectedVi(null);
        return;
      }
      setSelectedVi(id);
      if (selectedEn) resolvePair(selectedEn, id);
    },
    [selectedEn, selectedVi, resolvePair]
  );

  return {
    boardIndex,
    boardCount: boards.length,
    enOrder,
    viOrder,
    viLabelById,
    selectedEn,
    selectedVi,
    mismatch,
    matchedIds,
    matchedCount: matchedIds.size,
    totalCount: questions.length,
    selectEn,
    selectVi,
  };
}
