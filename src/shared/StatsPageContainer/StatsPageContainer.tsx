import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { StatsHead } from '../StatsHead';
import { DailyStats } from '../DailyStats';
import { PomodoroStats } from '../PomodoroStats';
import { BarChart } from '../BarChart';
import { Focus } from '../Focus';
import { StopCount } from '../StopCount';
import { Content } from '../Content';
import { IPeriod, IStatsItem } from '../../store/stats/statsSlice';
import { useAppSelector } from '../../hooks/storeHooks';
import { PauseTime } from '../PauseTime';

moment.locale('ru');

const initialDay: IStatsItem = {
  date: moment().format('YYYY-MM-DD'),
  pause_sec: 0,
  pomodoro_cnt: 0,
  stop_cnt: 0,
  work_sec: 0,
};

export function StatsPageContainer() {
  const statsItems = useAppSelector((state) => state.stats.items);
  const periods = useAppSelector((state) => state.stats.periods);
  const [selectedPeriod, setSelectedPeriod] = useState<IPeriod>({
    id: 0,
    label: '',
    isSelected: false,
  });
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(moment().day() - 1);
  const [selectedDayName, setSelectedDayName] = useState(moment().format('dddd'));
  const [statsDay, setStatsDay] = useState(initialDay);

  const handleClickBarItem = (index: number) => {
    setSelectedDayNumber(index);
    const currSelectedPeriod = periods.find((period) => period.isSelected);

    if (!currSelectedPeriod) {
      return;
    }

    switch (currSelectedPeriod.id) {
      case 1:
        setCurrentDate(moment().set('day', index + 1).format('YYYY-MM-DD'));
        break;
      case 2:
        setCurrentDate(moment().subtract(7, 'days').set('day', index + 1).format('YYYY-MM-DD'));
        break;
      case 3:
        setCurrentDate(moment().subtract(14, 'days').set('day', index + 1).format('YYYY-MM-DD'));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setSelectedDayName(moment(currentDate).format('dddd'));

    const currentStatsItem = statsItems.find((item) => item.date === currentDate);

    if (currentStatsItem) {
      setStatsDay(currentStatsItem);
    } else {
      setStatsDay({
        date: currentDate,
        pomodoro_cnt: 0,
        stop_cnt: 0,
        work_sec: 0,
        pause_sec: 0,
      });
    }
  }, [currentDate]);

  useEffect(() => {
    const currSelectedPeriod = periods.find((period) => period.isSelected);

    if (!currSelectedPeriod) {
      return;
    }

    setSelectedPeriod(currSelectedPeriod);

    switch (currSelectedPeriod.id) {
      case 1:
        setCurrentDate(moment().format('YYYY-MM-DD'));
        setSelectedDayNumber(moment().day() - 1);
        break;
      case 2:
        setCurrentDate(moment().subtract(7, 'days').format('YYYY-MM-DD'));
        setSelectedDayNumber(moment().subtract(7, 'days').day() - 1);
        break;
      case 3:
        setCurrentDate(moment().subtract(14, 'days').format('YYYY-MM-DD'));
        setSelectedDayNumber(moment().subtract(14, 'days').day() - 1);
        break;
      default:
        break;
    }
  }, [periods]);

  return (
    <Content>
      <StatsHead />
      <DailyStats dayName={selectedDayName} time={statsDay.work_sec}/>
      <PomodoroStats pomodoro={statsDay.pomodoro_cnt} />
      <BarChart
        currentDay={selectedDayNumber}
        handleClick={handleClickBarItem}
        selectedPeriod={selectedPeriod}/>
      <Focus
        pauseTime={statsDay.pause_sec}
        workTime={statsDay.work_sec}
        pomodoroCount={statsDay.pomodoro_cnt} />
      <PauseTime time={statsDay.pause_sec} />
      <StopCount count={statsDay.stop_cnt} />
    </Content>
  );
}
