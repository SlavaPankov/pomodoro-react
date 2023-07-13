import React, { useEffect, useState } from 'react';
import styles from './taskList.scss';
import { Task } from './TaskItem';
import { useAppSelector } from '../../store/hooks/hooks';

export function TaskList() {
  const { tasks } = useAppSelector((state) => state.tasks);
  const [totalTime, setTotalTime] = useState('');

  function getNoun(number: number, one: string, two: string, five: string) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }

  function convertTime(time: number) {
    const hours = (time / 60);
    const roundHours = Math.floor(hours);
    const minutes = (hours - roundHours) * 60;
    const roundMinutes = Math.round(minutes);
    if (!roundHours) {
      return `${roundMinutes} ${getNoun(roundMinutes, 'минута', 'минуты', 'минут')}`;
    }

    if (!roundMinutes) {
      return `${roundHours} ${getNoun(roundHours, 'час', 'часа', 'часов')}`;
    }

    return `${roundHours} ${getNoun(roundHours, 'час', 'часа', 'часов')} и ${roundMinutes} ${getNoun(roundMinutes, 'минута', 'минуты', 'минут')}`;
  }

  useEffect(() => {
    if (tasks.length === 0) {
      setTotalTime('');
      return;
    }

    const tasksTime = tasks.reduce((acc, val) => acc + val.pomodoro * 25, 0);
    setTotalTime(convertTime(tasksTime));
  }, [tasks]);

  return (
    <ul className={`${styles.list} list-reset`}>
      {
        tasks
          .map((task) => <Task
            key={task.id}
            id={task.id}
            pomodoro={task.pomodoro}
            title={task.title}
          />)
      }
      {totalTime && <li className={styles.totalTime}>{totalTime}</li>}
    </ul>
  );
}
