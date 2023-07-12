/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface IFormModeState {
  isCreate: boolean,
  taskId: number
}

const initialState: IFormModeState = {
  isCreate: true,
  taskId: 0,
};

export const formModeSlice = createSlice({
  name: 'formMode',
  initialState,
  reducers: {
    toggleFormMode: (state, action) => {
      state.isCreate = !state.isCreate;
      state.taskId = action.payload;
    },
  },
});

export const {
  toggleFormMode,
} = formModeSlice.actions;

export default formModeSlice.reducer;
