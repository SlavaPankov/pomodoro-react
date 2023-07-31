import React from 'react';
import { useAppSelector } from '../../hooks/storeHooks';
import { SelectItem } from './SelectItem';
import styles from './selectList.scss';

export function SelectList() {
  const periods = useAppSelector((state) => state.stats.periods)
    .filter((period) => !period.isSelected);

  return (
    <ul className={`${styles.list} list-reset`}>
      {
        periods.map((period) => <SelectItem id={period.id} label={period.label} key={period.id} />)
      }
    </ul>
  );
}
