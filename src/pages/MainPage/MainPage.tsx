import React from 'react';
import { TextBlock } from '../../shared/TextBlock';
import { TaskForm } from '../../shared/TaskForm';
import { TaskList } from '../../shared/TaskList/TaskList';
import { Timer } from '../../shared/Timer';
import { Content } from '../../shared/Content';

export function MainPage() {
  return (
    <Content>
      <TextBlock/>
      <TaskForm/>
      <TaskList/>
      <Timer/>
    </Content>
  );
}
