import React from 'react';
import styles from './timerControls.scss';

interface IControlButton {
  name: string,
  onClick: () => void,
  disabled: boolean
}
interface ITimerControlsProps {
  first: IControlButton,
  second: IControlButton,
}

export function TimerControls({ first, second }: ITimerControlsProps) {
  return (
    <div className={styles.timerControls}>
      <button
        className={styles.startButton}
        disabled={first.disabled}
        onClick={first.onClick}
      >
        {first.name}
      </button>
      <button
        className={styles.stopButton}
        disabled={second.disabled}
        onClick={second.onClick}
      >
        {second.name}
      </button>
    </div>
  );
}
