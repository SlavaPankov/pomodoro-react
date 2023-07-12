import React from 'react';
import styles from './textBlock.scss';
import { Title } from './Title';
import { StepsList } from './StepsList';

export function TextBlock() {
  return (
    <div className={styles.textBlock}>
      <Title />
      <StepsList />
    </div>
  );
}
