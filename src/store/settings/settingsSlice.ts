/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISettingsState {
  pomodoroTime: number,
  shortBreakTime: number,
  longBreakTime: number,
  longBreakFrequency: number,
  isNotification: boolean,
  themeMode: boolean,
}

const initialState: ISettingsState = {
  isNotification: true,
  longBreakTime: 30,
  longBreakFrequency: 4,
  pomodoroTime: 25,
  shortBreakTime: 5,
  themeMode: true,
};

export const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPomodoroTime: (state, action: PayloadAction<number>) => {
      state.pomodoroTime = action.payload;
    },

    setShortBreakTime: (state, action: PayloadAction<number>) => {
      state.shortBreakTime = action.payload;
    },

    setLongBreakTime: (state, action: PayloadAction<number>) => {
      state.longBreakTime = action.payload;
    },

    setLongBreakFrequency: (state, action: PayloadAction<number>) => {
      state.longBreakFrequency = action.payload;
    },

    setIsNotification: (state, action: PayloadAction<boolean>) => {
      state.isNotification = action.payload;
    },

    toggleMode: (state, action: PayloadAction<boolean>) => {
      state.themeMode = action.payload;
    },
  },
});

export const {
  setPomodoroTime,
  setShortBreakTime,
  setLongBreakTime,
  setLongBreakFrequency,
  setIsNotification,
  toggleMode,
} = settingSlice.actions;

export default settingSlice.reducer;
