import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import styles from './barChart.scss';
import { Bar } from './Bar';
import { useAppSelector } from '../../hooks/storeHooks';
import { IPeriod } from '../../store/stats/statsSlice';
import { convertTime } from '../../utils/convertTime';
import { EConvertTypeMode } from '../../types/EConverTypeMode';

interface IBarChartProps {
  currentDay: number,
  handleClick: (index: number) => void,
  selectedPeriod: IPeriod,
}

interface IWeekDay {
  date: string,
  name: string,
  isActive: boolean,
  workSec: number,
}

let weekDays: Array<IWeekDay> = [];

export function BarChart({ currentDay, handleClick, selectedPeriod }: IBarChartProps) {
  const { themeMode } = useAppSelector((state) => state.settings);
  const statsItem = useAppSelector((state) => state.stats.items);
  const [data, setData] = useState<Array<number>>(Array(7).fill(0));
  const [maxWorkSec, setMaxWorkSec] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  function calculateHeight(sec: number, maxSec: number) {
    const maxHeight = 375;
    const height = (maxHeight / maxSec) * sec;

    if (height === Infinity) {
      return maxHeight;
    }

    return height > 0 ? height : 5;
  }

  useEffect(() => {
    const parent = ref.current;

    if (!parent || data.length === 0) {
      return;
    }

    const heights: Array<number> = [];
    data.forEach(() => heights.push(calculateHeight(
      Math.floor(Math.random() * (1500 - 1500 + 1) + 100),
      parent.getBoundingClientRect().height,
    )));
    setData(heights);
  }, []);

  useEffect(() => {
    weekDays = [];

    let subtractDays = 0;

    switch (selectedPeriod.id) {
      case 1:
        subtractDays = 0;
        break;
      case 2:
        subtractDays = 7;
        break;
      case 3:
        subtractDays = 14;
        break;
      default:
        break;
    }

    for (let dayNumber = 0; dayNumber < 7; dayNumber += 1) {
      const weekDayDate = moment().subtract(subtractDays, 'days').weekday(dayNumber).format('YYYY-MM-DD');
      const weekDayName = moment().subtract(subtractDays, 'days').weekday(dayNumber).format('ddd');
      let workSec = 0;

      const foundStatItem = statsItem.find((item) => item.date === weekDayDate);

      if (foundStatItem) {
        workSec = foundStatItem.work_sec;
      }

      weekDays.push({
        date: weekDayDate,
        name: weekDayName,
        isActive: currentDay === dayNumber,
        workSec,
      });
    }

    setMaxWorkSec(
      weekDays
        .reduce((prev, current) => (prev > current.workSec ? prev : current.workSec), 0),
    );
  }, [currentDay, selectedPeriod]);

  const wrapperClassName = classNames({
    [styles.wrapper]: true,
    [styles.wrapper_dark]: !themeMode,
  });

  const yItemClassName = classNames({
    [styles.yItem]: true,
    [styles.yItem_dark]: !themeMode,
  });

  const labelsClassName = classNames('list-reset', {
    [styles.labels]: true,
    [styles.labels_dark]: !themeMode,
  });

  const itemClassName = classNames({
    [styles.item]: true,
    [styles.item_dark]: !themeMode,
  });

  const itemActiveClassName = classNames({
    [styles.item]: true,
    [styles.selected]: true,
  });

  return (
    <div className={wrapperClassName}>
      <div className={styles.barChart} ref={ref}>
        <div className={styles.yAxis}>
          <div className={yItemClassName}>
            {convertTime(maxWorkSec, EConvertTypeMode.short)}
          </div>
          <div className={yItemClassName}>
            {convertTime((maxWorkSec / 4) * 3, EConvertTypeMode.short)}
          </div>
          <div className={yItemClassName}>
            {convertTime((maxWorkSec / 4) * 2, EConvertTypeMode.short)}
          </div>
          <div className={yItemClassName}>
            {convertTime(maxWorkSec / 4, EConvertTypeMode.short)}
          </div>
          <div className={yItemClassName}></div>
        </div>
        <div className={styles.bars}>
          {weekDays.map((day, index) => <Bar
            index={index}
            isActive={day.isActive}
            handleClick={handleClick}
            height={calculateHeight(day.workSec, maxWorkSec)}
            key={index}
          />)}
        </div>
      </div>
      <ul className={labelsClassName}>
        {
          weekDays.map((day, index) => <li key={index}
            className={day.isActive ? `${itemActiveClassName}` : `${itemClassName}`}
          >
            {day.name}
          </li>)
        }
      </ul>
    </div>
  );
}
