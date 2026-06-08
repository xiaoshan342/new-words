import React, { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: 'cyan' | 'purple' | 'pink' | 'none';
}

export function Card({ children, className = '', glow = 'none' }: CardProps) {
  return (
    <div className={`${styles.card} ${styles[`glow-${glow}`]} ${className}`}>
      {children}
    </div>
  );
}
