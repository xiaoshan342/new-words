export interface WordRecord {
  due: number;
  wrong: number;
  correctStreak: number;
  lastSeen: number;
}

export type WordMemory = Record<string, WordRecord>;

const MEMORY_KEY = 'vocab_learner_word_memory';

const emptyRecord = (): WordRecord => ({
  due: 0,
  wrong: 0,
  correctStreak: 0,
  lastSeen: 0,
});

export function loadWordMemory(): WordMemory {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(MEMORY_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as WordMemory;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function saveWordMemory(memory: WordMemory): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
}

export function recordAnswer(wordEn: string, correct: boolean): void {
  const key = wordEn.trim().toLowerCase();
  if (!key) return;

  const memory = loadWordMemory();
  const rec = memory[key] ?? emptyRecord();
  rec.lastSeen = Date.now();

  if (correct) {
    rec.correctStreak += 1;
    if (rec.due > 0) rec.due -= 1;
  } else {
    rec.wrong += 1;
    rec.correctStreak = 0;
    rec.due = Math.min(rec.due + 2, 12);
  }

  memory[key] = rec;
  saveWordMemory(memory);
}
