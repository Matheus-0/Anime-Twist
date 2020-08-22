import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { createStore } from 'redux';

import reducer from './reducers';

const persistedReducer = persistReducer({
  key: 'root',
  storage: AsyncStorage,
}, reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
