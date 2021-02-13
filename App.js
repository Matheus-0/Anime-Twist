import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, UIManager, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Quicksand_400Regular, Quicksand_600SemiBold, useFonts } from '@expo-google-fonts/quicksand';

import Routes from './src/routes';

import { persistedStore, store } from './src/store';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_600SemiBold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <PersistGate loading={<AppLoading />} persistor={persistedStore}>
        <View style={{ backgroundColor: '#191919', flex: 1 }}>
          <Routes />

          <StatusBar
            animated
            style="light"
            translucent={false}
          />
        </View>
      </PersistGate>
    </Provider>
  );
}
