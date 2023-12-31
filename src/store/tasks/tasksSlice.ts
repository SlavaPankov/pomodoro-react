import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITask {
  id: number,
  title: string,
  isDone: boolean,
  pomodoro: number,
  currentPomodoro: number,
  createdAt: number,
  completedAt: number,
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
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.unshift(action.payload);
    },

    editTask: (state, action: PayloadAction<{ id: number, title: string }>) => {
      const [editableTask] = state.tasks.filter((task) => task.id === action.payload.id);
      editableTask.title = action.payload.title;
    },

    setTaskIsDone: (state, action: PayloadAction<number>) => {
      const [currTask] = state.tasks.filter((task) => task.id === action.payload);

      currTask.isDone = true;
    },

    addPomodoro: (state, action) => {
      const currTask = state.tasks.find((task) => task.id === action.payload);

      if (currTask) {
        currTask.pomodoro += 1;
      }
    },

    setCurrentPomodoro: (state, action) => {
      const [currTask] = state.tasks.filter((task) => task.id === action.payload);

      currTask.currentPomodoro += 1;
    },

    removePomodoro: (state, action) => {
      const currTask = state.tasks.find((task) => task.id === action.payload);

      if (currTask) {
        currTask.pomodoro = currTask.pomodoro === 1 ? currTask.pomodoro : currTask.pomodoro - 1;
      }
    },

    removeTask: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const {
  addTask,
  editTask,
  addPomodoro,
  setTaskIsDone,
  setCurrentPomodoro,
  removePomodoro,
  removeTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
