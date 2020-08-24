/* eslint-disable camelcase */
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Quicksand_400Regular, Quicksand_700Bold, useFonts } from '@expo-google-fonts/quicksand';

import { persistor, store } from './src/store';

import Routes from './src/routes';

import NetworkStatus from './src/components/NetworkStatus';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <PersistGate loading={<AppLoading />} persistor={persistor}>
        <Routes />
        <StatusBar style="light" translucent={false} />
        <NetworkStatus
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 10,
            bottom: 90,
            paddingVertical: 5,
            position: 'absolute',
            width: '50%',
          }}
        />
      </PersistGate>
    </Provider>
  );
}
