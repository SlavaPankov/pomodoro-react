import React, { useEffect, useState } from 'react';
import styles from './taskList.scss';
import { Task } from './TaskItem';
import { useAppSelector } from '../../hooks/storeHooks';
import { convertTime } from '../../utils/convertTime';

export function TaskList() {
  const { tasks } = useAppSelector((state) => state.tasks);
  const settings = useAppSelector((state) => state.settings);
  const [totalTime, setTotalTime] = useState('');
  useEffect(() => {
    if (tasks.filter((task) => !task.isDone).length === 0) {
      setTotalTime('');
      return;
    }

    const tasksTime = tasks
      .filter((task) => !task.isDone)
      .reduce((acc, val) => acc + val.pomodoro * settings.pomodoroTime, 0);
    setTotalTime(convertTime(tasksTime * 60));
  }, [tasks]);

  return (
    <ul className={`${styles.list} list-reset`}>
      {
        tasks
          .filter((task) => !task.isDone)
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
