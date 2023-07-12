import React from 'react';
import styles from './taskItem.scss';
import { Menu } from './Menu';

interface ITaskItemProps {
  id: number,
  pomodoro: number,
  title: string
}

export function Task({ id, pomodoro, title }: ITaskItemProps) {
  return (
    <li className={styles.taskItem}>
      <span className={styles.pomodoro}>{pomodoro}</span>
      <span className={styles.title}>{title}</span>
      <Menu id={id}/>
    </li>
  );
}
