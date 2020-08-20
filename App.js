/* eslint-disable camelcase */
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Provider } from 'react-redux';

import { Quicksand_400Regular, Quicksand_700Bold, useFonts } from '@expo-google-fonts/quicksand';

import store from './src/store';
import { loadAnimeList } from './src/store/actions';

import Routes from './src/routes';

import { getAnimeList } from './src/services/api';

const loadResourcesAsync = async () => {
  const animeList = await getAnimeList();

  store.dispatch(loadAnimeList(animeList));

  return Promise.all(animeList);
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  const [isReady, setIsReady] = useState(false);

  if (!isReady && !fontsLoaded) {
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
      <StatusBar style="light" translucent={false} />
    </Provider>
  );
}
