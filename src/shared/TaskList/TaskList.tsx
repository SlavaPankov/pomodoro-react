import React from 'react';
import styles from './taskList.scss';
import { TaskItem } from './TaskItem';

interface ITask {
  id: number,
  title: string,
  pomodoro: number,
  isDone: boolean,
}

export function TaskList() {
  const taskList: Array<ITask> = [
    {
      id: 1,
      title: 'Test 1',
      pomodoro: 2,
      isDone: false,
    },
    {
      id: 2,
      title: 'Test 2',
      pomodoro: 3,
      isDone: false,
    },
  ];

  return (
    <ul className={`${styles.list} list-reset`}>
      {
        taskList
          .map((task) => <TaskItem key={task.id} pomodoro={task.pomodoro} title={task.title}/>)
      }
    </ul>
  );
}
