import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITask {
  id: number,
  title: string,
  isDone: boolean,
  pomodoro: number
}

interface TasksState {
  tasks: Array<ITask>,
}

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'Tasks',
  initialState,
  reducers: {
    push: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload);
    },
  },
});

export const { push } = tasksSlice.actions;

export default tasksSlice.reducer;
