/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

export interface IPeriod {
  id: number,
  label: string,
  isSelected: boolean,
}

export interface IStatsItem {
  date: string,
  pomodoro_cnt: number,
  stop_cnt: number,
  work_sec: number,
  pause_sec: number,
}

interface IStatsState {
  items: Array<IStatsItem>,
  periods: Array<IPeriod>
}

const currentDateStateItem: IStatsItem = {
  date: moment().format('YYYY-MM-DD'),
  pomodoro_cnt: 0,
  stop_cnt: 0,
  work_sec: 0,
  pause_sec: 0,
};

const initialStatState: IStatsState = {
  items: [currentDateStateItem],
  periods: [
    {
      id: 1,
      label: 'Эта неделя',
      isSelected: true,
    },
    {
      id: 2,
      label: 'Прошедшая неделя',
      isSelected: false,
    },
    {
      id: 3,
      label: '2 недели назад',
      isSelected: false,
    },
  ],
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState: initialStatState,
  reducers: {
    setCurrentDateEmptyItem: (state) => {
      const currentDate = moment().format('YYYY-MM-DD');
      const findStatItem = state.items.find((statItem) => statItem.date === currentDate);

      if (!findStatItem) {
        state.items.push(currentDateStateItem);
      }
    },

    increaseStatPomodoroCounter: (state) => {
      const currentDate = moment().format('YYYY-MM-DD');
      const findStatItem = state.items.find((statItem) => statItem.date === currentDate);

      if (findStatItem) {
        findStatItem.pomodoro_cnt += 1;
      }
    },

    increaseStatStopCounter: (state) => {
      const currentDate = moment().format('YYYY-MM-DD');
      const findStatItem = state.items.find((statItem) => statItem.date === currentDate);

      if (findStatItem) {
        findStatItem.stop_cnt += 1;
      }
    },

    increaseStatPauseSec: (state) => {
      const currentDate = moment().format('YYYY-MM-DD');
      const findStatItem = state.items.find((statItem) => statItem.date === currentDate);

      if (findStatItem) {
        findStatItem.pause_sec += 1;
      }
    },

    togglePeriodSelected: (state, action: PayloadAction<number>) => {
      const currPeriod = state.periods.find((period) => period.id === action.payload);

      if (currPeriod) {
        currPeriod.isSelected = true;

        state.periods
          .filter((period) => period.id !== action.payload)
          .map((item) => {
            item.isSelected = false;
            return item;
          });
      }
    },

    increaseStatWorkSec: (state) => {
      const currentDate = moment().format('YYYY-MM-DD');
      const findStatItem = state.items.find((statItem) => statItem.date === currentDate);

      if (findStatItem) {
        findStatItem.work_sec += 1;
      }
    },

    subStatWorkSec: (state, action: PayloadAction<number>) => {
      const currentDate = moment().format('YYYY-MM-DD');
      const findStatItem = state.items.find((statItem) => statItem.date === currentDate);

      if (findStatItem) {
        findStatItem.work_sec -= action.payload;
      }
    },
  },
});

export const {
  increaseStatPomodoroCounter,
  increaseStatStopCounter,
  increaseStatPauseSec,
  increaseStatWorkSec,
  setCurrentDateEmptyItem,
  togglePeriodSelected,
  subStatWorkSec,
} = statsSlice.actions;

export default statsSlice.reducer;
