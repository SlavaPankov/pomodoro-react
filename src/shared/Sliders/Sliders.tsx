import React from 'react';
import { Slider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import {
  setLongBreakFrequency,
  setLongBreakTime,
  setPomodoroTime,
  setShortBreakTime,
} from '../../store/settings/settingsSlice';
import styles from './sliders.scss';
import { setSeconds } from '../../store/timer/timerSlice';

export function Sliders() {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const workMarks = [
    {
      value: 5,
      label: '5 минут',
    },
    {
      value: settings.pomodoroTime,
      label: `${settings.pomodoroTime}`,
    },
    {
      value: 60,
      label: '60 минут',
    },
  ];
  const shortBreakMarks = [
    {
      value: 1,
      label: '1 минута',
    },
    {
      value: settings.shortBreakTime,
      label: `${settings.shortBreakTime}`,
    },
    {
      value: 15,
      label: '15 минут',
    },
  ];
  const longBreakMarks = [
    {
      value: 15,
      label: '15 минут',
    },
    {
      value: settings.longBreakTime,
      label: `${settings.longBreakTime}`,
    },
    {
      value: 45,
      label: '45 минут',
    },
  ];
  const longBreakFrequencyMarks = [
    {
      value: 2,
      label: '2',
    },
    {
      value: settings.longBreakFrequency,
      label: `${settings.longBreakFrequency}`,
    },
    {
      value: 15,
      label: '15',
    },
  ];

  function handlePomodoroTimeChange(event: Event, value: number | number[]) {
    if (typeof value === 'number') {
      dispatch(setPomodoroTime(value));
      dispatch(setSeconds(value * 60));
    }
  }

  function handleShortBreakTimeChange(event: Event, value: number | number[]) {
    if (typeof value === 'number') {
      dispatch(setShortBreakTime(value));
    }
  }

  function handleLongBreakTimeChange(event: Event, value: number | number[]) {
    if (typeof value === 'number') {
      dispatch(setLongBreakTime(value));
    }
  }

  function handleLongBreakFrequencyChange(event: Event, value: number | number[]) {
    if (typeof value === 'number') {
      dispatch(setLongBreakFrequency(value));
    }
  }

  return (
    <>
      <div className={styles.work}>
        <h2 className={styles.heading}>
          Продолжительность «помидора»
        </h2>
        <Slider
          marks={workMarks}
          min={5} max={60}
          step={5}
          value={settings.pomodoroTime}
          onChange={handlePomodoroTimeChange}
        />
      </div>
      <div className={styles.shortBreak}>
        <h2 className={styles.heading}>
          Продолжительность короткого перерыва
        </h2>
        <Slider
          marks={shortBreakMarks}
          min={1} max={15}
          step={1}
          value={settings.shortBreakTime}
          onChange={handleShortBreakTimeChange}
        />
      </div>
      <div className={styles.longBreak}>
        <h2 className={styles.heading}>
          Продолжительность длинного перерыва
        </h2>
        <Slider
          marks={longBreakMarks}
          min={15} max={45}
          step={5}
          value={settings.longBreakTime}
          onChange={handleLongBreakTimeChange}
        />
      </div>
      <div className={styles.longBreakFr}>
        <h2 className={styles.heading}>
          Частота длинных перерывов
        </h2>
        <Slider
          marks={longBreakFrequencyMarks}
          min={2} max={15}
          step={1}
          value={settings.longBreakFrequency}
          onChange={handleLongBreakFrequencyChange}
        />
      </div>
    </>);
}
