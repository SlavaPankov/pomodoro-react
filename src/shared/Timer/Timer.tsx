import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './timer.scss';
import { TimerHeading } from './TimerHeader';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import {
  ITask,
  setCurrentPomodoro, removeTask, addPomodoro,
} from '../../store/tasks/tasksSlice';
import { TimerControls } from '../TimerControls';
import {
  increaseBreakCount,
  resetMode,
  setModeBreak,
  setModeWork,
  setSeconds,
} from '../../store/timer/timerSlice';
import { getTimerStrTime } from '../../utils/getTimerStrTime';
import {
  increaseStatPauseSec,
  increaseStatPomodoroCounter,
  increaseStatStopCounter,
  increaseStatWorkSec, subStatWorkSec,
} from '../../store/stats/statsSlice';
import { EMode } from '../../types/EMode';

interface IControlButton {
  name: string,
  onClick: () => void,
  disabled: boolean
}

const emptyTask = {
  id: 0,
  title: '',
  isDone: false,
  pomodoro: 0,
  currentPomodoro: 0,
  createdAt: new Date(0).getTime(),
  completedAt: new Date(0).getTime(),
};

export function Timer() {
  const dispatch = useAppDispatch();

  const { tasks } = useAppSelector((state) => state.tasks);
  const { themeMode } = useAppSelector((state) => state.settings);
  const settings = useAppSelector((state) => state.settings);
  const mode = useAppSelector((state) => state.timer.mode);
  const breakCount = useAppSelector((state) => state.timer.breakCount);
  const shortBreakTime = useAppSelector((state) => state.settings.shortBreakTime);
  const longBreakTime = useAppSelector((state) => state.settings.longBreakTime);
  const timer = useAppSelector((state) => state.timer);

  const [currTask, setCurrTask] = useState<ITask>(emptyTask);
  const [currPomodoro, setCurrPomodoro] = useState(1);
  const [taskNumber, setTaskNumber] = useState(1);
  const [currentBreak, setCurrentBreak] = useState(breakCount);
  const [breakTime, setBreakTime] = useState(breakCount % 4 ? longBreakTime : shortBreakTime);
  const [timerSec, setTimerSec] = useState(timer.seconds);

  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [isBreakStarted, setIsBreakStarted] = useState(false);
  const [isBreakPaused, setIsBreakPaused] = useState(false);
  const [isTasksListEmpty, setIsTasksListEmpty] = useState(true);

  function handleStart() {
    if (isBreakTime) {
      setIsBreakStarted(true);
      dispatch(setModeBreak());
    } else {
      setIsStarted(true);
      dispatch(setModeWork());
    }
  }

  function handlePause() {
    if (isBreakTime) {
      setIsBreakPaused(true);
    } else {
      setIsPaused(true);
    }
  }

  function handleResume() {
    if (isBreakTime) {
      setIsBreakPaused(false);
    } else {
      setIsPaused(false);
    }
  }

  function handleStop() {
    setIsPaused(false);
    setIsStarted(false);
    setTimerSec(settings.pomodoroTime * 60);
    dispatch(setSeconds(settings.pomodoroTime * 60));

    dispatch(resetMode());
    dispatch(increaseStatStopCounter());
    dispatch(subStatWorkSec(settings.pomodoroTime * 60 - timerSec));
  }

  function handleCompleteTask() {
    setIsPaused(false);
    setIsStarted(false);
    setIsBreakTime(true);

    setTimerSec(breakTime * 60);
    dispatch(setSeconds(breakTime * 60));

    dispatch(setModeBreak());
    dispatch(increaseStatPomodoroCounter());

    if (currPomodoro === currTask.pomodoro) {
      setTaskNumber(taskNumber + 1);
      dispatch(removeTask(currTask.id));
    } else {
      setCurrPomodoro(currPomodoro + 1);
      dispatch(setCurrentPomodoro(currTask.id));
    }
  }

  function handleCompleteBreak() {
    setIsBreakPaused(false);
    setIsBreakStarted(false);
    setIsBreakTime(false);

    setTimerSec(settings.pomodoroTime * 60);

    dispatch(setSeconds(settings.pomodoroTime * 60));
    dispatch(setModeWork());
    dispatch(increaseBreakCount());
  }

  function showControlButtons() {
    let firstButton: IControlButton = {
      name: 'Старт',
      onClick: handleStart,
      disabled: isTasksListEmpty,
    };

    let secondButton: IControlButton = {
      name: isBreakTime ? 'Пропустить' : 'Стоп',
      onClick: isBreakTime ? handleCompleteBreak : handleStop,
      disabled: !isBreakTime,
    };

    if (isPaused || isBreakPaused) {
      firstButton = {
        name: 'Продолжить',
        onClick: handleResume,
        disabled: isTasksListEmpty,
      };

      secondButton = {
        name: isBreakTime ? 'Пропустить' : 'Сделано',
        onClick: isBreakTime ? handleCompleteBreak : handleCompleteTask,
        disabled: isTasksListEmpty,
      };
    } else if (isStarted || isBreakStarted) {
      firstButton = {
        name: 'Пауза',
        onClick: handlePause,
        disabled: isTasksListEmpty,
      };

      secondButton = {
        name: isBreakTime ? 'Пропустить' : 'Стоп',
        onClick: isBreakTime ? handleCompleteBreak : handleStop,
        disabled: isTasksListEmpty,
      };
    }

    return <TimerControls first={firstButton} second={secondButton}/>;
  }

  useEffect(() => {
    if (!timer.seconds) {
      dispatch(setSeconds(settings.pomodoroTime * 60));
    }
  }, [settings]);

  useEffect(() => {
    if (tasks.length > 0) {
      setCurrTask(tasks[0]);
      setCurrPomodoro(tasks[0].currentPomodoro);
      setIsTasksListEmpty(false);
      return;
    }

    setIsTasksListEmpty(true);
    setIsPaused(false);
    setIsStarted(false);
    setIsBreakTime(false);
    setTimerSec(settings.pomodoroTime * 60);
    dispatch(resetMode());
  }, [tasks]);

  useEffect(() => {
    setCurrentBreak(breakCount);

    if (breakCount % 4 === 0) {
      setBreakTime(longBreakTime);
    } else {
      setBreakTime(shortBreakTime);
    }
  }, [breakCount]);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (
        (isStarted && !isPaused && timerSec > 0)
        || (isBreakStarted && !isBreakPaused && timerSec > 0)
      ) {
        setTimerSec(timerSec - 1);
        dispatch(setSeconds(timerSec));

        if (!isBreakTime) {
          dispatch(increaseStatWorkSec());
        }
      }

      if (isPaused) {
        dispatch(increaseStatPauseSec());
      }

      if (isStarted && timerSec === 0) {
        handleCompleteTask();
      }

      if (isBreakStarted && timerSec === 0) {
        handleCompleteBreak();
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [timerSec, isStarted, isPaused, isBreakStarted, isBreakPaused]);

  const timerClassNames = classNames({
    [styles.timer]: true,
    [styles.timer_dark]: !themeMode,
  });

  const valueClassNames = classNames({
    [styles.timerValue]: true,
    [styles.timerValue_dark]: !themeMode,
    [styles.work]: mode === EMode.work && !isPaused,
    [styles.break]: mode === EMode.break && !isPaused,
  });

  const subtitleClassNames = classNames({
    [styles.subtitle]: true,
    [styles.subtitle_dark]: !themeMode,
  });

  return (
    <div className={timerClassNames}>
      <TimerHeading
        title={currTask.title}
        currPomodoro={currPomodoro}
        currentBreak={currentBreak}
      />
      <div className={styles.wrapper}>
        <div className={styles.timerContent}>
          <div className={valueClassNames}>{getTimerStrTime(timerSec)}</div>
          <button className={`${styles.more} btn-reset`} onClick={() => dispatch(addPomodoro(currTask.id))}>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="25" fill="#C4C4C4"/>
              <path
                d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z"
                fill="white"/>
            </svg>
          </button>
        </div>
        <div className={subtitleClassNames}>
          {currTask.title && `Задача ${taskNumber} - ${currTask.title}`}
        </div>
        {showControlButtons()}
      </div>
    </div>
  );
}
