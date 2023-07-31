import React from 'react';
import styles from './menuItemsList.scss';
import {
  PlusIcon, MinusIcon, EditIcon, RemoveIcon,
} from '../../../../Icons';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/storeHooks';
import {
  addPomodoro, removePomodoro, removeTask,
} from '../../../../../store/tasks/tasksSlice';
import { setTaskValue } from '../../../../../store/taskValue/taskValueSlice';
import { toggleFormMode } from '../../../../../store/formMode/formModeSlice';

interface IMenuItemsListProps {
  id: number,
}

export function MenuItemsList({ id }: IMenuItemsListProps) {
  const dispatch = useAppDispatch();
  const [taskById] = useAppSelector((state) => state.tasks.tasks).filter((task) => task.id === id);

  function handlePlusClick() {
    dispatch(addPomodoro(id));
  }

  function handleMinusClick() {
    dispatch(removePomodoro(id));
  }

  function handleRemoveClick() {
    dispatch(removeTask(id));
  }

  function handleEditClick() {
    dispatch(toggleFormMode(id));
    dispatch(setTaskValue(taskById.title));
  }

  return (
    <ul className={`list-reset ${styles.list}`}>
      <li className={styles.item}>
        <button onClick={handlePlusClick} className={`${styles.button} btn-reset`}>
          <PlusIcon /> Увеличить
        </button>
      </li>
      <li className={styles.item}>
        <button onClick={handleMinusClick} className={`${styles.button} btn-reset`}>
          <MinusIcon /> Уменьшить
        </button>
      </li>
      <li className={styles.item}>
        <button onClick={handleEditClick} className={`${styles.button} btn-reset`}>
          <EditIcon /> Редактировать
        </button>
      </li>
      <li className={styles.item}>
        <button onClick={handleRemoveClick} className={`${styles.button} btn-reset`}>
          <RemoveIcon /> Удалить
        </button>
      </li>
    </ul>
  );
}
