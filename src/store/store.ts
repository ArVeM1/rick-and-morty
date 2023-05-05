import { configureStore, createStore } from "@reduxjs/toolkit";
import { charactersApi } from "./api/characters";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { locationsApi } from "./api/locations";
import { filterReducer } from "./slices/filter";

const reducer = (state: any) => state;

export const store = configureStore({
  reducer: {
    [charactersApi.reducerPath]: charactersApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      charactersApi.middleware,
      locationsApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
