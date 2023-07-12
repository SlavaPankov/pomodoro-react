import React from 'react';
import styles from './taskForm.scss';

export function TaskForm() {
  return (
    <form className={styles.form}>
      <input className={styles.input} type="text" placeholder="Название задачи" />
      <button className={styles.button}>Добавить</button>
    </form>
  );
}
