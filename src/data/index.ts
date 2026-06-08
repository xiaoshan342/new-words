// Re-export types từ types.ts để các file khác vẫn có thể import từ '@/data'
export type { VocabWord, Category, CEFRLevel } from './types';
export { ALL_CATEGORIES } from './types';

import { itWords } from './categories/it';
import { businessWords } from './categories/business';
import { healthcareWords } from './categories/healthcare';
import { dailyLifeWords } from './categories/daily_life';
import type { VocabWord } from './types';

const allWords: VocabWord[] = [...itWords, ...businessWords, ...healthcareWords, ...dailyLifeWords];

export function shuffleArray<T>(array: T[]): T[] {
   const arr = [...array];
   for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
   }
   return arr;
}

export function getRandomWords(
  category: import('./types').Category,
  level: import('./types').CEFRLevel,
  count: number
): VocabWord[] {
  let pool = category === 'All Topics' ? allWords : allWords.filter((w) => w.category === category);

  // Lọc theo level nếu không phải Random
  if (level !== 'Random') {
    pool = pool.filter((w) => w.level === level);
  }

  const shuffled = shuffleArray(pool);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export default allWords;
