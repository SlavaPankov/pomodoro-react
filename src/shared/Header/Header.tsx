import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.scss';
import { PomodoroIcon, StatsIcon } from '../Icons';
import { SettingsIcon } from '../Icons/SettingsIcon/SettingsIcon';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} container`}>
        <Link to="/" className={styles.logo}>
          <PomodoroIcon />
          pomodoro_box
        </Link>
        <Link to="/stats" className={styles.stats}>
          <StatsIcon />
          Статистика
        </Link>
        <Link to="/settings" className={styles.settings}>
          <SettingsIcon />
          Настройки
        </Link>
      </div>
    </header>
  );
}
