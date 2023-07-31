import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './Header';
import { MainPage } from '../pages/MainPage';
import { SettingsPage } from '../pages/SettingsPage';
import { StatsPage } from '../pages/StatsPage';
import { useAppDispatch } from '../hooks/storeHooks';
import { setCurrentDateEmptyItem } from '../store/stats/statsSlice';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentDateEmptyItem());
  }, []);

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="./" element={<MainPage/>}/>
        <Route path="./settings" element={<SettingsPage/>}/>
        <Route path="./stats" element={<StatsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
