import React from 'react';
import { Header } from './Header';
import { Content } from './Content';
import { TextBlock } from './TextBlock';
import { TaskForm } from './TaskForm';
import { Timer } from './Timer';
import { TaskList } from './TaskList/TaskList';

export function App() {
  return (
    <>
      <Header />
      <Content>
        <TextBlock />
        <TaskForm />
        <TaskList />
        <Timer />
      </Content>
    </>
  );
}
