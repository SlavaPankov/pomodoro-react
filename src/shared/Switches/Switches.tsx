import React, { ChangeEvent } from 'react';
import { Switch } from '@mui/material';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { setIsNotification } from '../../store/settings/settingsSlice';
import styles from './switches.scss';

export function Switches() {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setIsNotification(event.target.checked));
  }

  const className = classNames('heading-reset', {
    [styles.title]: true,
    [styles.title_dark]: !settings.themeMode,
  });

  return (
    <div className={styles.notify}>
      <h2 className={className}>Включить уведомления</h2>
      <Switch onChange={handleOnChange} checked={settings.isNotification}/>
    </div>
  );
}
