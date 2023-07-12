import React from 'react';
import { Header } from './Header';
import { Content } from './Content';
import { TextBlock } from './TextBlock';

export function App() {
  return (
    <>
      <Header />
      <Content>
        <TextBlock />
      </Content>
    </>
  );
}
