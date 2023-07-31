import React from 'react';
import classNames from 'classnames';
import styles from './title.scss';
import { useAppSelector } from '../../../hooks/storeHooks';

export function Title() {
  const { themeMode } = useAppSelector((state) => state.settings);

  const className = classNames({
    [styles.title]: true,
    [styles.title_dark]: !themeMode,
  });

  return (
    <h1 className={`${className} heading-reset`}>
      Ура! Теперь можно начать работать:
    </h1>
  );
}
