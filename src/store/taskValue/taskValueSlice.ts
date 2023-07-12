import { createSlice } from '@reduxjs/toolkit';

interface ITaskValueSlice {
  value: string,
}

const initialState: ITaskValueSlice = {
  value: '',
};

export const taskValueSlice = createSlice({
  name: 'taskValue',
  initialState,
  reducers: {
    setTaskValue: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const {
  setTaskValue,
} = taskValueSlice.actions;

export default taskValueSlice.reducer;
