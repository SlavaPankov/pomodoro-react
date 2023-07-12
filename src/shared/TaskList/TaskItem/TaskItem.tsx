import React from 'react';
import styles from './taskItem.scss';

interface ITaskItemProps {
  pomodoro: number,
  title: string
}

export function TaskItem({ pomodoro, title }: ITaskItemProps) {
  return (
    <li className={styles.taskItem}>
      <span className={styles.pomodoro}>{pomodoro}</span>
      <span className={styles.title}>{title}</span>
      <button className={`${styles.button} btn-reset`}>
        <svg width="26" height="6" viewBox="0 0 26 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="3" cy="3" r="3" fill="#C4C4C4"/>
          <circle cx="13" cy="3" r="3" fill="#C4C4C4"/>
          <circle cx="23" cy="3" r="3" fill="#C4C4C4"/>
        </svg>
      </button>
    </li>
  );
}
