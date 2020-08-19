import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { loadAnimeList } from './src/store/actions';
import reducer from './src/store/reducers';

import Routes from './src/routes';

import { getAnimeList } from './src/services/api';

const store = createStore(reducer);

const loadResourcesAsync = async () => {
  const animeList = await getAnimeList();

  store.dispatch(loadAnimeList(animeList));

  return Promise.all(animeList);
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <Routes />
      <StatusBar style="light" />
    </Provider>
  );
}
