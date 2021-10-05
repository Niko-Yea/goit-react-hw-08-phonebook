import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import filterReducer from './filter/filter-reducer'
import { authApi } from './auth/authApi'
import { phonebookApi } from './contacts/phonebookApi'
import authSlice from './auth/authSlice'
// import phonebookSlice from "./contacts/phonebookSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
}

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  authApi.middleware,
  phonebookApi.middleware,
]

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [phonebookApi.reducerPath]: phonebookApi.reducer,
    authSlice: persistReducer(authPersistConfig, authSlice),
    // phonebookSlice,
    filterReducer,
  },
  middleware,

  devTools: process.env.NODE_ENV === 'development',
})

export const persistor = persistStore(store)

export const rootState = store.getState()
