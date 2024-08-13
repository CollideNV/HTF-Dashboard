import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { combineReducers } from 'redux'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import { dashboardApi } from './services/dashboardApi'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [], // elements that will be persisted
    blacklist: [] // elements that will not be persisted
}

const rootReducer = combineReducers({
    [dashboardApi.reducerPath]: dashboardApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }).concat(dashboardApi.middleware)
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
