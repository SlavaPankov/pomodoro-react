import React from 'react';
import classNames from 'classnames';
import styles from './timerHeading.scss';
import { useAppSelector } from '../../../hooks/storeHooks';
import { EMode } from '../../../types/EMode';

interface ITimerHeadingProps {
  title?: string,
  currPomodoro?: number,
  currentBreak?: number,
}

export function TimerHeading({ title = '', currPomodoro = 1, currentBreak = 1 }: ITimerHeadingProps) {
  const { mode } = useAppSelector((state) => state.timer);
  const { themeMode } = useAppSelector((state) => state.settings);

  const className = classNames({
    [styles.heading]: true,
    [styles.heading_dark]: !themeMode,
    [styles.work]: mode === EMode.work,
    [styles.break]: mode === EMode.break,
  });

  return (
    <div className={className}>
      <div className={styles.task}>{title}</div>
      <div className={styles.pomodoro}>{
        mode === 'work' ? `Помидор ${currPomodoro}` : `Перерыв ${currentBreak}`
      }</div>
    </div>
  );
}
