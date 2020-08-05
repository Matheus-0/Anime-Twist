import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './src/store/reducers';

import Routes from './src/routes';

const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
      <StatusBar style="light" />
    </Provider>
  );
}
