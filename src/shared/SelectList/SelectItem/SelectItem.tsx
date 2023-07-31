import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { togglePeriodSelected } from '../../../store/stats/statsSlice';
import styles from './selectItem.scss';

interface ISelectItemProps {
  id?: number,
  label?: string,
}

export function SelectItem({ id, label }: ISelectItemProps) {
  const dispatch = useAppDispatch();
  const { themeMode } = useAppSelector((state) => state.settings);
  function handleClick() {
    if (!id) {
      return;
    }

    dispatch(togglePeriodSelected(id));
  }

  const className = classNames({
    [styles.item]: true,
    [styles.item_dark]: !themeMode,
  });

  return (
    <li className={className} onClick={handleClick}>{label}</li>
  );
}
