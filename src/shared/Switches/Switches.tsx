import React, { ChangeEvent } from 'react';
import { Switch } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { setIsNotification } from '../../store/settings/settingsSlice';
import styles from './switches.scss';

export function Switches() {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setIsNotification(event.target.checked));
  }

  return (
    <>
      <div className={styles.notify}>
        <h2 className="heading-reset">Включить уведомления</h2>
        <Switch onChange={handleOnChange} checked={settings.isNotification}/>
      </div>
    </>
  );
}
