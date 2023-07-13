import React from 'react';
import styles from './timerHeading.scss';
import { useAppSelector } from '../../../store/hooks/hooks';

interface ITimerHeadingProps {
  title?: string,
  currPomodoro?: number
}

export function TimerHeading({ title = '', currPomodoro = 1 }: ITimerHeadingProps) {
  const { mode } = useAppSelector((state) => state.timer);

  function getStyles() {
    if (mode === 'work') {
      return `${styles.heading} ${styles.work}`;
    }

    if (mode === 'break') {
      return `${styles.heading} ${styles.break}`;
    }

    return `${styles.heading}`;
  }

  return (
    <div className={getStyles()}>
      <div className={styles.task}>{title}</div>
      <div className={styles.pomodoro}>Помидор {currPomodoro}</div>
    </div>
  );
}
