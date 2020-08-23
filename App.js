/* eslint-disable camelcase */
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Platform, Text, UIManager, View,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Quicksand_400Regular, Quicksand_700Bold, useFonts } from '@expo-google-fonts/quicksand';

import { persistor, store } from './src/store';
import { loadAnimeList } from './src/store/actions';

import Routes from './src/routes';

import { getAnimeList } from './src/services/api';

const loadResourcesAsync = async () => {
  const animeList = await getAnimeList();

  store.dispatch(loadAnimeList(animeList));

  return Promise.all(animeList);
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
      <PersistGate loading={<AppLoading />} persistor={persistor}>
        <Routes />
        <StatusBar style="light" translucent={false} />
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#e63232',
            borderRadius: 10,
            bottom: 90,
            paddingVertical: 5,
            position: 'absolute',
            width: '50%',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'Quicksand_400Regular',
              fontSize: 13,
            }}
          >
            No connection.
          </Text>
        </View>
      </PersistGate>
    </Provider>
  );
}
