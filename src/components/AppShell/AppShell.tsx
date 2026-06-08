'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { HomeScreen } from '@/screens/HomeScreen/HomeScreen';
import { TestSetupScreen } from '@/screens/TestSetupScreen/TestSetupScreen';
import { TestScreen } from '@/screens/TestScreen/TestScreen';
import { ResultScreen } from '@/screens/ResultScreen/ResultScreen';

export function AppShell() {
  const { state } = useAppContext();

  switch (state.screen) {
    case 'home':
      return <HomeScreen />;
    case 'setup':
      return <TestSetupScreen />;
    case 'test':
      return <TestScreen />;
    case 'result':
      return <ResultScreen />;
    default:
      return <HomeScreen />;
  }
}
