'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { VocabWord, Category, CEFRLevel } from '@/data';
import { LifetimeStats, loadStats, updateStats } from '@/utils/localStorage';

// ─── Types ───────────────────────────────────────────────────────────────────

export type AppScreen = 'home' | 'setup' | 'test' | 'result';
export type TestDirection = 'en-vi' | 'vi-en';
export type QuestionCount = number;

export interface TestConfig {
  category: Category;
  direction: TestDirection;
  questionCount: QuestionCount;
  level: CEFRLevel;
}

export interface WrongAnswer {
  word: VocabWord;
  userAnswer: string;
}

export interface TestState {
  questions: VocabWord[];
  currentIndex: number;
  correctCount: number;
  wrongAnswers: WrongAnswer[];
}

export interface AppState {
  screen: AppScreen;
  config: TestConfig;
  test: TestState;
  lifetimeStats: LifetimeStats;
}

// ─── Actions ─────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_SCREEN'; screen: AppScreen }
  | { type: 'UPDATE_CONFIG'; config: Partial<TestConfig> }
  | { type: 'START_TEST'; questions: VocabWord[] }
  | { type: 'ANSWER_CORRECT' }
  | { type: 'ANSWER_WRONG'; userAnswer: string }
  | { type: 'NEXT_QUESTION' }
  | { type: 'FINISH_TEST' }
  | { type: 'RESET_TEST' }
  | { type: 'LOAD_STATS'; stats: LifetimeStats };

// ─── Initial State ───────────────────────────────────────────────────────────

const initialConfig: TestConfig = {
  category: 'All Topics',
  direction: 'en-vi',
  questionCount: 10,
  level: 'Random',
};

const initialTestState: TestState = {
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  wrongAnswers: [],
};

const initialState: AppState = {
  screen: 'home',
  config: initialConfig,
  test: initialTestState,
  lifetimeStats: { totalCorrect: 0, totalIncorrect: 0 },
};

// ─── Reducer ─────────────────────────────────────────────────────────────────

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, screen: action.screen };

    case 'UPDATE_CONFIG':
      return { ...state, config: { ...state.config, ...action.config } };

    case 'START_TEST':
      return {
        ...state,
        screen: 'test',
        test: {
          questions: action.questions,
          currentIndex: 0,
          correctCount: 0,
          wrongAnswers: [],
        },
      };

    case 'ANSWER_CORRECT':
      return {
        ...state,
        test: { ...state.test, correctCount: state.test.correctCount + 1 },
      };

    case 'ANSWER_WRONG':
      return {
        ...state,
        test: {
          ...state.test,
          wrongAnswers: [
            ...state.test.wrongAnswers,
            {
              word: state.test.questions[state.test.currentIndex],
              userAnswer: action.userAnswer,
            },
          ],
        },
      };

    case 'NEXT_QUESTION':
      return {
        ...state,
        test: { ...state.test, currentIndex: state.test.currentIndex + 1 },
      };

    case 'FINISH_TEST': {
      const incorrect =
        state.test.questions.length - state.test.correctCount;
      const updatedStats = updateStats(state.test.correctCount, incorrect);
      return {
        ...state,
        screen: 'result',
        lifetimeStats: updatedStats,
      };
    }

    case 'RESET_TEST':
      return {
        ...state,
        screen: 'home',
        test: initialTestState,
      };

    case 'LOAD_STATS':
      return { ...state, lifetimeStats: action.stats };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const stats = loadStats();
    dispatch({ type: 'LOAD_STATS', stats });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider');
  return ctx;
}
