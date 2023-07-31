/* eslint-disable no-console */
import React from 'react';
import classNames from 'classnames';
import styles from './focus.scss';
import { FocusIcon } from '../Icons';
import { useAppSelector } from '../../hooks/storeHooks';

interface IFocusProps {
  pauseTime: number,
  workTime: number,
  pomodoroCount: number,
}

export function Focus({ pauseTime, workTime }: IFocusProps) {
  const { themeMode } = useAppSelector((state) => state.settings);
  let focus = Math.floor(((workTime) / (workTime + pauseTime)) * 100);

  if (focus < 0 || Number.isNaN(focus)) {
    focus = 0;
  }

  const focusClassName = classNames({
    [styles.focus]: true,
    [styles.focus_dark]: !themeMode,
    [styles.withData]: focus !== 0 && themeMode,
    [styles.withData_dark]: focus !== 0 && !themeMode,
  });

  const titleClassName = classNames('heading-reset', {
    [styles.title]: true,
    [styles.title_dark]: !themeMode,
  });

  const valueClassName = classNames({
    [styles.value]: true,
    [styles.value_dark]: !themeMode,
  });

  return (
    <div className={focusClassName}>
      <h3 className={titleClassName}>Фокус</h3>
      <div className={valueClassName}>{focus}%</div>
      <div className={styles.icon}>
        <FocusIcon/>
      </div>
    </div>
  );
}
