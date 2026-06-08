export interface LifetimeStats {
  totalCorrect: number;
  totalIncorrect: number;
}

const STATS_KEY = 'vocab_learner_stats';

export function loadStats(): LifetimeStats {
  if (typeof window === 'undefined') {
    return { totalCorrect: 0, totalIncorrect: 0 };
  }
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return { totalCorrect: 0, totalIncorrect: 0 };
    return JSON.parse(raw) as LifetimeStats;
  } catch {
    return { totalCorrect: 0, totalIncorrect: 0 };
  }
}

export function saveStats(stats: LifetimeStats): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function updateStats(correct: number, incorrect: number): LifetimeStats {
  const current = loadStats();
  const updated: LifetimeStats = {
    totalCorrect: current.totalCorrect + correct,
    totalIncorrect: current.totalIncorrect + incorrect,
  };
  saveStats(updated);
  return updated;
}
