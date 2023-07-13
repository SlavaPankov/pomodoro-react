import React, {
  ChangeEvent, FormEvent, useState,
} from 'react';
import styles from './taskForm.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { addTask, editTask } from '../../store/tasks/tasksSlice';
import { setTaskValue } from '../../store/taskValue/taskValueSlice';
import { toggleFormMode } from '../../store/formMode/formModeSlice';

export function TaskForm() {
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => state.taskValue.value);
  const mode = useAppSelector((state) => state.formMode.isCreate);
  const taskId = useAppSelector((state) => state.formMode.taskId);
  const { tasks } = useAppSelector((state) => state.tasks);
  const [error, setError] = useState('');

  function getTaskId(): number {
    const lastTask = [...tasks].pop();

    return lastTask ? lastTask.id + 1 : 1;
  }

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    setError('');
    dispatch(setTaskValue(evt.target.value));
  }

  function validateForm() {
    if (!task) {
      setError('Введите название задачи');
      return false;
    }

    return true;
  }

  function handleSubmitCreate(evt: FormEvent) {
    evt.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(addTask({
      id: getTaskId(),
      title: task,
      isDone: false,
      pomodoro: 1,
      createdAt: new Date(),
      completedAt: new Date(0),
    }));

    dispatch(setTaskValue(''));
  }

  function handleSubmitUpdate(evt: FormEvent) {
    evt.preventDefault();

    if (!validateForm() && taskId !== 0) {
      return;
    }

    dispatch(editTask({
      id: taskId,
      title: task,
    }));
    dispatch(setTaskValue(''));
    dispatch(toggleFormMode(0));
  }

  return (
    <form className={styles.form} onSubmit={mode ? handleSubmitCreate : handleSubmitUpdate}>
      <input value={task} onChange={handleChange} className={styles.input} type="text" placeholder="Название задачи" />
      {error && <span className={styles.error}>{error}</span>}
      <button className={styles.button}>{mode ? 'Добавить' : 'Изменить'}</button>
    </form>
  );
}
