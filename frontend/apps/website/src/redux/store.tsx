import { configureStore } from "@reduxjs/toolkit";

interface PreloadedState {
}

const createStore = (preloadedState?: PreloadedState) => {
  return configureStore({
    preloadedState,
    reducer: {},
    devTools: process.env.NODE_ENV !== "production",
  });
};

type AppStore = ReturnType<typeof createStore>;
type RootState = ReturnType<AppStore["getState"]>;
type AppDispatch = AppStore["dispatch"];

export type {
  PreloadedState,
};

export type {
  AppStore,
  RootState,
  AppDispatch,
};

export default createStore;
