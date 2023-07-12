import React from 'react';
import styles from './header.scss';
import { PomodoroIcon, StatsIcon } from '../Icons';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} container`}>
        <a href="#" className={styles.logo}>
          <PomodoroIcon />
          pomodoro_box
        </a>
        <a href="#" className={styles.stats}>
          <StatsIcon />
          Статистика
        </a>
      </div>
    </header>
  );
}
