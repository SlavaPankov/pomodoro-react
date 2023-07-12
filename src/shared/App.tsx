import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Header } from './Header';
import { Content } from './Content';
import { TextBlock } from './TextBlock';
import { TaskForm } from './TaskForm';
import { Timer } from './Timer';
import { TaskList } from './TaskList/TaskList';
import store, { persistor } from '../store/store';

export function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Header/>
          <Content>
            <TextBlock/>
            <TaskForm/>
            <TaskList/>
            <Timer/>
          </Content>
        </PersistGate>
      </Provider>
    </>
  );
}
