import React from 'react';
import classNames from 'classnames';
import styles from './stepsList.scss';
import { useAppSelector } from '../../../hooks/storeHooks';

export function StepsList() {
  const { themeMode } = useAppSelector((state) => state.settings);

  const classNameItem = classNames({
    [styles.listItem]: true,
    [styles.listItem_dark]: !themeMode,
  });

  return (
    <ul className={`${styles.list} list-reset`}>
      <li className={classNameItem}>
        Выберите категорию и напишите название текущей задачи
      </li>
      <li className={classNameItem}>
        Запустите таймер («помидор»)
      </li>
      <li className={classNameItem}>
        Работайте пока «помидор» не прозвонит
      </li>
      <li className={classNameItem}>
        Сделайте короткий перерыв (3-5 минут)
      </li>
      <li className={classNameItem}>
        Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена.
        Каждые 4 «помидора» делайте
        длинный перерыв (15-30 минут).
      </li>
    </ul>
  );
}
