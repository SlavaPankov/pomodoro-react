import React from 'react';
import styles from './timerHeading.scss';

interface ITimerHeadingProps {
  title?: string,
  currPomodoro?: number
}

export function TimerHeading({ title = '', currPomodoro = 1 }: ITimerHeadingProps) {
  return (
    <div className={styles.heading}>
      <div className={styles.task}>{title}</div>
      <div className={styles.pomodoro}>Помидор {currPomodoro}</div>
    </div>
  );
}
