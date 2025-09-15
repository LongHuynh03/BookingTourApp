import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import authSlice from './slices/authSlice';
import bookingSlice from './slices/bookingSlice';
import tourSlice from './slices/tourSlice';
import userSlice from './slices/userSlice';

// Transform to avoid persisting transient auth fields (loading, error)
const authTransform = createTransform(
  (inboundState: any) => {
    // When persisting, drop transient fields just in case
    const { loading, error, ...rest } = inboundState || {};
    return { ...rest };
  },
  (outboundState: any) => {
    // When rehydrating, ensure clean defaults
    return { ...outboundState, loading: false, error: null };
  },
  { whitelist: ['auth'] }
);

// Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Only persist auth state
  transforms: [authTransform],
};

const rootReducer = combineReducers({
  auth: authSlice,
  tour: tourSlice,
  booking: bookingSlice,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
