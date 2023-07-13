import React, { useEffect, useRef, useState } from 'react';
import styles from './timer.scss';
import { TimerHeading } from './TimerHeader';
import { useAppSelector } from '../../store/hooks/hooks';
import { ITask } from '../../store/tasks/tasksSlice';

type TimerMode = 'focus' | 'paused' | null;

export function Timer() {
  const { tasks } = useAppSelector((state) => state.tasks);
  const settings = useAppSelector((state) => state.settings);
  const [currTask, setCurrTask] = useState<ITask>({
    id: 0,
    title: '',
    isDone: false,
    pomodoro: 0,
    currentPomodoro: 0,
    createdAt: new Date(0),
    completedAt: new Date(0),
  });
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState<TimerMode>('focus');

  const secondRef = useRef(seconds);
  const modeRef = useRef(mode);
  const isPausedRef = useRef(isPaused);

  function tick() {
    secondRef.current -= 1;
    setSeconds(secondRef.current);
  }

  useEffect(() => {
    if (tasks.length === 0) {
      return;
    }

    const task = [...tasks].shift();

    if (task) {
      setCurrTask(task);
    }
  }, [tasks]);

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === 'focus' ? 'paused' : 'focus';
      const nextSeconds = (nextMode === 'focus' ? settings.pomodoroTime : settings.shortBreakTime) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSeconds(nextSeconds);
      secondRef.current = nextSeconds;
    }

    secondRef.current = settings.pomodoroTime * 60;
    setSeconds(secondRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }

      if (secondRef.current === 0) {
        // eslint-disable-next-line consistent-return
        return switchMode();
      }

      tick();
    }, 30);

    return () => clearInterval(interval);
  }, []);

  function handleStartClick() {
    setIsPaused(false);
    isPausedRef.current = false;
  }

  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  let secondsLeftStr = `${secondsLeft}`;
  if (secondsLeft < 3) {
    secondsLeftStr = `0${secondsLeft}`;
  }

  return (
    <div className={styles.timer}>
      <TimerHeading title={currTask.title} currPomodoro={currTask.currentPomodoro}/>
      <div className={styles.wrapper}>
        <div className={styles.timerContent}>
          <div className={styles.timerValue}>{minutes}:{secondsLeftStr}</div>
          <button className={`${styles.more} btn-reset`}>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="25" fill="#C4C4C4"/>
              <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z"
                fill="white"/>
            </svg>
          </button>
        </div>
        <div className={styles.subtitle}>
          Задача {currTask.id} - {currTask.title}
        </div>
        <div className={styles.timerControls}>
          <button onClick={handleStartClick}>Старт</button>
          <button>Стоп</button>
        </div>
      </div>
    </div>
  );
}
