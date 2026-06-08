import React, { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  state?: 'idle' | 'correct' | 'wrong';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, state = 'idle', className = '', ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <input
          ref={ref}
          className={`${styles.input} ${styles[state]} ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
