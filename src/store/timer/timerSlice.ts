/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITimerState {
  seconds: number,
  mode: 'work' | 'break' | null,
  isPaused: boolean
}

const initialState: ITimerState = {
  seconds: 0,
  mode: null,
  isPaused: true,
};

export const timerSlice = createSlice({
  name: 'timer slice',
  initialState,
  reducers: {
    setIsPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },

    setModeWork: (state) => {
      state.mode = 'work';
    },

    setModeBreak: (state) => {
      state.mode = 'break';
    },

    resetMode: (state) => {
      state.mode = null;
    },

    setSeconds: (state, action: PayloadAction<number>) => {
      state.seconds = action.payload;
    },
  },
});

export const {
  setModeWork,
  setModeBreak,
  resetMode,
  setIsPaused,
  setSeconds,
} = timerSlice.actions;

export default timerSlice.reducer;
