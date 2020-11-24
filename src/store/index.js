import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { createStore } from 'redux';

import reducer from './reducers';

const persistConfig = {
  key: 'storage',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
const persistedStore = persistStore(store);

export { store, persistedStore };
