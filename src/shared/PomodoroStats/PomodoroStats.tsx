import React from 'react';
import classNames from 'classnames';
import styles from './pomodoroStats.scss';
import { PomodoroIconBig, TomatoIcon } from '../Icons';
import { getNoun } from '../../utils/getNoun';
import { useAppSelector } from '../../hooks/storeHooks';

interface IPomodoroStats {
  pomodoro: number,
}

export function PomodoroStats({ pomodoro }: IPomodoroStats) {
  const { themeMode } = useAppSelector((state) => state.settings);

  const className = classNames({
    [styles.stats]: true,
    [styles.stats_dark]: !themeMode,
  });

  return (
    <div className={className}>
      {
        pomodoro === 0
          ? <TomatoIcon />
          : <>
            <div className={styles.pomodoro}>
              <PomodoroIconBig />
              <div>{`x ${pomodoro}`}</div>
            </div>
            <div className={styles.label}>{pomodoro} {getNoun(pomodoro, 'помидор', 'помидора', 'помидоров')}</div>
          </>
      }
    </div>
  );
}
