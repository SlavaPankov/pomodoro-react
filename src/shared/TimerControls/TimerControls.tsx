import React from 'react';
import styles from './timerControls.scss';
import { useAppSelector } from '../../store/hooks/hooks';

interface ITimerControlsProps {
  handleStartClick: () => void,
  handleStopClick: () => void,
}

export function TimerControls({ handleStartClick, handleStopClick }: ITimerControlsProps) {
  const isPaused = useAppSelector((state) => state.timer.isPaused);
  const mode = useAppSelector((state) => state.timer.mode);

  function getStopButtonTextContent() {
    if (mode === 'work') {
      return isPaused ? 'Сделано' : 'Стоп';
    }

    if (mode === null) {
      return 'Стоп';
    }

    return 'Пропустить';
  }

  return (
    <div className={styles.timerControls}>
      <button
        className={styles.startButton}
        onClick={handleStartClick}
      >
        { isPaused ? 'Старт' : 'Пауза' }
      </button>
      <button
        className={styles.stopButton}
        disabled={isPaused && !mode}
        onClick={handleStopClick}
      >
        {getStopButtonTextContent()}
      </button>
    </div>
  );
}
