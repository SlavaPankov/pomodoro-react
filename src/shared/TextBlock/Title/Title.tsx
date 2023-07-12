import React from 'react';
import styles from './title.scss';

export function Title() {
  return (
    <h1 className={`${styles.title} heading-reset`}>
      Ура! Теперь можно начать работать:
    </h1>
  );
}
