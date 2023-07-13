import React, { useEffect, useRef, useState } from 'react';
import styles from './timer.scss';
import { TimerHeading } from './TimerHeader';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { ITask } from '../../store/tasks/tasksSlice';
import { TimerControls } from '../TimerControls';
import {
  resetMode, setIsPaused, setModeBreak, setModeWork, setSeconds,
} from '../../store/timer/timerSlice';

export function Timer() {
  const { tasks } = useAppSelector((state) => state.tasks);
  const settings = useAppSelector((state) => state.settings);
  const timer = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();
  const [currTask, setCurrTask] = useState<ITask>({
    id: 0,
    title: '',
    isDone: false,
    pomodoro: 0,
    currentPomodoro: 0,
    createdAt: new Date(0).getTime(),
    completedAt: new Date(0).getTime(),
  });
  const seconds = useAppSelector((state) => state.timer.seconds);
  const isPaused = useAppSelector((state) => state.timer.isPaused);
  const mode = useAppSelector((state) => state.timer.mode);

  const secondRef = useRef(seconds);
  // const modeRef = useRef(mode);

  useEffect(() => {
    dispatch(setSeconds(settings.pomodoroTime * 60));
  }, [settings]);

  function tick() {
    secondRef.current -= 1;
    // eslint-disable-next-line no-plusplus
    dispatch(setSeconds(secondRef.current));
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
    dispatch(setSeconds(secondRef.current));

    function switchMode() {
      if (mode === 'work') {
        dispatch(setModeBreak());
        dispatch(setSeconds(settings.shortBreakTime * 60));
        secondRef.current = settings.shortBreakTime * 60;
      } else if (mode === 'break') {
        dispatch(setModeWork());
        dispatch(setSeconds(settings.pomodoroTime * 60));
        secondRef.current = settings.pomodoroTime * 60;
      }

      dispatch(setIsPaused(true));
    }

    const interval = setInterval(() => {
      if (isPaused) {
        return;
      }

      if (secondRef.current === 0) {
      // eslint-disable-next-line consistent-return
        return switchMode();
      }

      tick();
    }, 50);

    return () => clearInterval(interval);
  }, [timer]);

  function handleStartClick() {
    if (!mode) {
      dispatch(setModeWork());
    }

    if (isPaused) {
      dispatch(setIsPaused(false));
    } else {
      dispatch(setIsPaused(true));
    }
  }

  function handleStopClick() {
    dispatch(setIsPaused(true));
    dispatch(setSeconds(settings.pomodoroTime * 60));
    secondRef.current = settings.pomodoroTime * 60;
    dispatch(resetMode());

    if (mode === 'break') {
      dispatch(setModeWork());
    }
  }

  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  let secondsLeftStr = `${secondsLeft}`;
  if (secondsLeft < 10) {
    secondsLeftStr = `0${secondsLeft}`;
  }

  function getStyles() {
    if (mode === 'work') {
      if (isPaused) {
        return `${styles.timerValue}`;
      }
      return `${styles.timerValue} ${styles.work}`;
    }

    if (mode === 'break') {
      if (isPaused) {
        return `${styles.timerValue}`;
      }
      return `${styles.timerValue} ${styles.break}`;
    }

    return `${styles.timerValue}`;
  }

  return (
    <div className={styles.timer}>
      <TimerHeading title={currTask.title} currPomodoro={currTask.currentPomodoro}/>
      <div className={styles.wrapper}>
        <div className={styles.timerContent}>
          <div className={getStyles()}>{minutes}:{secondsLeftStr}</div>
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
        <TimerControls handleStartClick={handleStartClick} handleStopClick={handleStopClick}/>
      </div>
    </div>
  );
}
