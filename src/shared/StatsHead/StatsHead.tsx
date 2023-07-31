import React from 'react';
import classNames from 'classnames';
import styles from './statsHead.scss';
import { Select } from '../Select/Select';
import { SelectList } from '../SelectList';
import { useAppSelector } from '../../hooks/storeHooks';

export function StatsHead() {
  const { themeMode } = useAppSelector((state) => state.settings);
  const [selectedPeriod] = useAppSelector((state) => state.stats.periods)
    .filter((period) => period.isSelected);

  const className = classNames('heading-reset', {
    [styles.heading]: true,
    [styles.heading_dark]: !themeMode,
  });

  return (
    <div className={styles.stylesHead}>
      <h2 className={className}>Ваша активность</h2>
      <Select selected={selectedPeriod.label}>
        <SelectList />
      </Select>
    </div>
  );
}
