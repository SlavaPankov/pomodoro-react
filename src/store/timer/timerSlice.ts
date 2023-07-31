/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EMode } from '../../types/EMode';

interface ITimerState {
  seconds: number,
  mode: EMode | null,
  breakCount: number,
}

const initialState: ITimerState = {
  seconds: 0,
  mode: null,
  breakCount: 1,
};

export const timerSlice = createSlice({
  name: 'timer slice',
  initialState,
  reducers: {
    setModeWork: (state) => {
      state.mode = EMode.work;
    },

    setModeBreak: (state) => {
      state.mode = EMode.break;
    },

    resetMode: (state) => {
      state.mode = null;
    },

    setSeconds: (state, action: PayloadAction<number>) => {
      state.seconds = action.payload;
    },

    increaseBreakCount: (state) => {
      state.breakCount += 1;
    },
  },
});

export const {
  setModeWork,
  setModeBreak,
  resetMode,
  setSeconds,
  increaseBreakCount,
} = timerSlice.actions;

export default timerSlice.reducer;
