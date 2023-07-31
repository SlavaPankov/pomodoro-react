import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import styles from './taskForm.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { addTask, editTask } from '../../store/tasks/tasksSlice';
import { setTaskValue } from '../../store/taskValue/taskValueSlice';
import { toggleFormMode } from '../../store/formMode/formModeSlice';

export function TaskForm() {
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => state.taskValue.value);
  const mode = useAppSelector((state) => state.formMode.isCreate);
  const { tasks } = useAppSelector((state) => state.tasks);
  const [taskId, setTaskId] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const lastTask = [...tasks].shift();

    if (lastTask) {
      setTaskId(lastTask.id + 1);
    }
  }, [tasks]);

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
      id: taskId,
      title: task,
      isDone: false,
      pomodoro: 1,
      currentPomodoro: 1,
      createdAt: new Date().getTime(),
      completedAt: new Date(0).getTime(),
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
