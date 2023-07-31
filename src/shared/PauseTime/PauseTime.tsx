import React from 'react';
import classNames from 'classnames';
import { ClockIcon } from '../Icons';
import styles from './pauseTime.scss';
import { useAppSelector } from '../../hooks/storeHooks';

interface IPauseTimeProps {
  time: number,
}

export function PauseTime({ time }: IPauseTimeProps) {
  const { themeMode } = useAppSelector((state) => state.settings);

  const pauseClassName = classNames({
    [styles.pause]: true,
    [styles.pause_dark]: !themeMode,
    [styles.withData]: time !== 0 && themeMode,
    [styles.withData_dark]: time !== 0 && !themeMode,
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
    <div className={pauseClassName}>
      <h3 className={titleClassName}>Время на паузе</h3>
      <div className={valueClassName}>{Math.floor((time / 60)) || 0}м</div>
      <div className={styles.icon}>
        <ClockIcon/>
      </div>
    </div>
  );
}
