import React from 'react';
import styles from './taskList.scss';
import { Task } from './TaskItem';
import { useAppSelector } from '../../store/hooks/hooks';

export function TaskList() {
  const { tasks } = useAppSelector((state) => state.tasks);

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
    </ul>
  );
}
