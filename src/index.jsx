import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.global.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';
import { App } from './shared/App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Container not found');
}
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App/>
    </PersistGate>
  </Provider>,
);
