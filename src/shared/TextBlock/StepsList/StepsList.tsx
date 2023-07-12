import React from 'react';
import styles from './stepsList.scss';

export function StepsList() {
  return (
    <ul className={`${styles.list} list-reset`}>
      <li className={styles.listItem}>
        Выберите категорию и напишите название текущей задачи
      </li>
      <li className={styles.listItem}>
        Запустите таймер («помидор»)
      </li>
      <li className={styles.listItem}>
        Работайте пока «помидор» не прозвонит
      </li>
      <li className={styles.listItem}>
        Сделайте короткий перерыв (3-5 минут)
      </li>
      <li className={styles.listItem}>
        Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена.
        Каждые 4 «помидора» делайте
        длинный перерыв (15-30 минут).
      </li>
    </ul>
  );
}
