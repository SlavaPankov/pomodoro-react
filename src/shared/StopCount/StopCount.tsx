import React from 'react';
import classNames from 'classnames';
import { StopIcon } from '../Icons';
import styles from './stopCount.scss';
import { useAppSelector } from '../../hooks/storeHooks';

interface IStopCountProps {
  count: number
}

export function StopCount({ count }: IStopCountProps) {
  const { themeMode } = useAppSelector((state) => state.settings);

  const stopClassName = classNames({
    [styles.stop]: true,
    [styles.stop_dark]: !themeMode,
    [styles.withData]: count !== 0 && themeMode,
    [styles.withData_dark]: count !== 0 && !themeMode,
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
    <div className={stopClassName}>
      <h3 className={titleClassName}>Остановки</h3>
      <div className={valueClassName}>{ count || 0 }</div>
      <div className={styles.icon}>
        <StopIcon />
      </div>
    </div>
  );
}
