import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './header.scss';
import { PomodoroIcon, SettingsIcon, StatsIcon } from '../Icons';
import { useAppSelector } from '../../hooks/storeHooks';
import { SwitchMode } from '../SwitchMode';

export function Header() {
  const mode = useAppSelector((state) => state.timer.mode);
  const { themeMode } = useAppSelector((state) => state.settings);

  const headerClassName = classNames({
    [styles.header]: true,
    [styles.header_dark]: !themeMode,
  });

  return (
    <header className={headerClassName}>
      <div className={`${styles.headerContainer} container`}>
        <Link to="/" className={styles.logo}>
          <PomodoroIcon/>
          pomodoro_box
        </Link>
        <SwitchMode />
        {
          mode === 'work'
            ? <span className={styles.stats} title="Сбросьте таймер">
              <StatsIcon/>
              Статистика
            </span>
            : <Link to="/stats" className={styles.stats}>
              <StatsIcon/>
              Статистика
            </Link>
        }
        {
          mode === 'work'
            ? <span className={styles.settings} title="Сбросьте таймер">
              <SettingsIcon/>
            Настройки
            </span>
            : <Link to="/settings" title="Настройки" className={styles.settings}>
              <SettingsIcon/>
              Настройки
            </Link>
        }
      </div>
    </header>
  );
}
