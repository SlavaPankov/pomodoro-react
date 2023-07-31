import React from 'react';
import classNames from 'classnames';
import styles from './taskItem.scss';
import { Menu } from './Menu';
import { useAppSelector } from '../../../hooks/storeHooks';

interface ITaskItemProps {
  id: number,
  pomodoro: number,
  title: string
}

export function Task({ id, pomodoro, title }: ITaskItemProps) {
  const { themeMode } = useAppSelector((state) => state.settings);

  const titleClassName = classNames({
    [styles.title]: true,
    [styles.title_dark]: !themeMode,
  });

  const pomodoroClassName = classNames({
    [styles.pomodoro]: true,
    [styles.pomodoro_dark]: !themeMode,
  });

  return (
    <li className={styles.taskItem}>
      <span className={pomodoroClassName}>{pomodoro}</span>
      <span className={titleClassName}>{title}</span>
      <Menu id={id}/>
    </li>
  );
}
