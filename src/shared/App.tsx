import React from 'react';
import { Provider } from 'react-redux';
import { Header } from './Header';
import { Content } from './Content';
import { TextBlock } from './TextBlock';
import { TaskForm } from './TaskForm';
import { Timer } from './Timer';
import { TaskList } from './TaskList/TaskList';
import { store } from '../store/store';

export function App() {
  return (
    <>
      <Provider store={store}>
        <Header/>
        <Content>
          <TextBlock/>
          <TaskForm/>
          <TaskList/>
          <Timer/>
        </Content>
      </Provider>
    </>
  );
}
