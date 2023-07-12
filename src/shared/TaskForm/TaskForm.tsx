import React, {
  ChangeEvent, FormEvent, useState,
} from 'react';
import styles from './taskForm.scss';
import { useAppDispatch } from '../../store/hooks/hooks';
import { push } from '../../store/tasks/tasksSlice';

export function TaskForm() {
  const dispatch = useAppDispatch();
  const [task, setTask] = useState('');

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    setTask(evt.target.value);
  }

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault();

    dispatch(push({
      id: 1,
      title: task,
      isDone: false,
      pomodoro: 1,
    }));

    setTask('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input value={task} onChange={handleChange} className={styles.input} type="text" placeholder="Название задачи" />
      <button className={styles.button}>Добавить</button>
    </form>
  );
}
