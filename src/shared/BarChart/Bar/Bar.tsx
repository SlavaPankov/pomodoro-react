import React from 'react';
import { BarIcon } from '../../Icons';
import styles from './bar.scss';

interface IBarProps {
  height?: number,
  handleClick: (index: number) => void,
  isActive: boolean,
  index: number
}

export function Bar({
  handleClick, isActive, index, height = 285,
}: IBarProps) {
  let className = styles.bar;

  if (isActive) {
    className += ` ${styles.selected}`;

    if (height <= 5) {
      className += ` ${styles.gray}`;
    }
  } else if (height <= 5) {
    className += ` ${styles.gray}`;
  }

  return (
    <div onClick={() => handleClick(index)} className={className}>
      <BarIcon height={height}/>
    </div>
  );
}
