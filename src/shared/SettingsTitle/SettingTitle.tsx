import React from 'react';
import classNames from 'classnames';
import styles from './settingsTitle.scss';
import { useAppSelector } from '../../hooks/storeHooks';

export function SettingTitle() {
  const { themeMode } = useAppSelector((state) => state.settings);

  const className = classNames({
    [styles.title]: true,
    [styles.title_dark]: !themeMode,
  });

  return (
    <h1 className={`${className} heading-reset`}>Настройки</h1>
  );
}
