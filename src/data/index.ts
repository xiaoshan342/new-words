// Re-export types từ types.ts để các file khác vẫn có thể import từ '@/data'
export type { VocabWord, Category, CEFRLevel } from './types';
export { ALL_CATEGORIES } from './types';

import { itWords } from './categories/it';
import { businessWords } from './categories/business';
import { healthcareWords } from './categories/healthcare';
import { dailyLifeWords } from './categories/daily_life';
import type { VocabWord, Category, CEFRLevel } from './types';
import type { WordMemory } from '@/utils/wordMemory';

const allWords: VocabWord[] = [...itWords, ...businessWords, ...healthcareWords, ...dailyLifeWords];

const REVIEW_SHARE = 0.6;

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function uniqueByEn(words: VocabWord[]): VocabWord[] {
  const seen = new Set<string>();
  const unique: VocabWord[] = [];
  for (const word of words) {
    const key = memoryKey(word);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(word);
  }
  return unique;
}

export function getWordPool(category: Category, level: CEFRLevel): VocabWord[] {
  let pool = category === 'All Topics' ? allWords : allWords.filter((w) => w.category === category);
  if (level !== 'Random') {
    pool = pool.filter((w) => w.level === level);
  }
  return uniqueByEn(pool);
}

function memoryKey(word: VocabWord): string {
  return word.en.trim().toLowerCase();
}

export function getPoolStats(
  category: Category,
  level: CEFRLevel,
  memory: WordMemory = {}
): { size: number; due: number } {
  const pool = getWordPool(category, level);
  return {
    size: pool.length,
    due: pool.filter((w) => (memory[memoryKey(w)]?.due ?? 0) > 0).length,
  };
}

function weightedSample<T>(items: T[], weights: number[], count: number): T[] {
  const n = Math.min(count, items.length);
  if (n <= 0) return [];

  const pool = items.map((item, i) => ({ item, weight: Math.max(weights[i] ?? 0, 0.0001) }));
  const picked: T[] = [];

  for (let i = 0; i < n; i++) {
    const total = pool.reduce((sum, entry) => sum + entry.weight, 0);
    let cursor = Math.random() * total;
    let index = pool.length - 1;

    for (let j = 0; j < pool.length; j++) {
      cursor -= pool[j].weight;
      if (cursor <= 0) {
        index = j;
        break;
      }
    }

    picked.push(pool[index].item);
    pool.splice(index, 1);
  }

  return picked;
}

function reviewWeight(word: VocabWord, memory: WordMemory): number {
  const rec = memory[memoryKey(word)];
  const due = rec?.due ?? 1;
  const wrong = rec?.wrong ?? 1;
  return 4 + due * 3 + wrong;
}

function exploreWeight(word: VocabWord, memory: WordMemory, now: number): number {
  const rec = memory[memoryKey(word)];
  if (!rec || !rec.lastSeen) return 8;

  const hours = (now - rec.lastSeen) / 3_600_000;
  const recency = 0.08 + 0.92 * (1 - Math.exp(-hours / 8));
  const streakPenalty =
    rec.correctStreak >= 3 ? 0.35 : rec.correctStreak >= 2 ? 0.6 : 1;

  return Math.max(0.05, recency * streakPenalty * 3);
}

function questionWeight(word: VocabWord, memory: WordMemory, now: number): number {
  if ((memory[memoryKey(word)]?.due ?? 0) > 0) return reviewWeight(word, memory);
  return exploreWeight(word, memory, now);
}

export function getRandomWords(
  category: Category,
  level: CEFRLevel,
  count: number,
  memory: WordMemory = {},
  options: { reviewOnly?: boolean } = {}
): VocabWord[] {
  const pool = getWordPool(category, level);
  if (pool.length === 0 || count <= 0) return [];

  const n = Math.min(count, pool.length);
  const now = Date.now();
  const review = pool.filter((w) => (memory[memoryKey(w)]?.due ?? 0) > 0);

  if (options.reviewOnly) {
    if (review.length === 0) return [];
    const picked = weightedSample(
      review,
      review.map((w) => reviewWeight(w, memory)),
      Math.min(n, review.length)
    );
    return shuffleArray(picked);
  }

  const reviewSlots =
    review.length === 0
      ? 0
      : Math.min(review.length, n, Math.max(1, Math.ceil(n * REVIEW_SHARE)));

  const fromReview = weightedSample(
    review,
    review.map((w) => reviewWeight(w, memory)),
    reviewSlots
  );
  const taken = new Set(fromReview.map((w) => w.id));
  const remaining = pool.filter((w) => !taken.has(w.id));
  const fromRest = weightedSample(
    remaining,
    remaining.map((w) => questionWeight(w, memory, now)),
    n - fromReview.length
  );

  return shuffleArray([...fromReview, ...fromRest]);
}

export default allWords;
