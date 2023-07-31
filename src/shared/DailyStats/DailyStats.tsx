import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './dailyStats.scss';
import { convertTime } from '../../utils/convertTime';
import { useAppSelector } from '../../hooks/storeHooks';

interface IDailyStatsProps {
  dayName: string,
  time?: number,
}

export function DailyStats({ dayName, time }: IDailyStatsProps) {
  const { themeMode } = useAppSelector((state) => state.settings);
  const ref = useRef<HTMLDivElement>(null);
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    if (!time) {
      setTextContent('Нет данных');
      ref.current.innerHTML = textContent;

      return;
    }

    const timeStr = convertTime(time);

    setTextContent(`Вы работали над задачами в течение <span>${timeStr}</span>`);
    ref.current.innerHTML = textContent;
  }, [time, ref, textContent]);

  const dailyClassName = classNames({
    [styles.daily]: true,
    [styles.daily_dark]: !themeMode,
  });

  const titleClassName = classNames('heading-reset', {
    [styles.title]: true,
    [styles.title_dark]: !themeMode,
  });

  const dataClassName = classNames({
    [styles.data]: true,
    [styles.data_dark]: !themeMode,
  });

  return (
    <div className={dailyClassName}>
      <h3 className={titleClassName}>
        {dayName}
      </h3>
      <div className={dataClassName} ref={ref}></div>
    </div>
  );
}
