import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './Header';
import store, { persistor } from '../store/store';
import { MainPage } from '../pages/MainPage';
import { SettingsPage } from '../pages/SettingsPage';

export function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <Header/>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </>
  );
}
