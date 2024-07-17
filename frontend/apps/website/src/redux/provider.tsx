"use client";

import React from "react";

import { Provider } from "react-redux";

import createStore, { AppStore, PreloadedState } from "./store";

interface Props {
  preloadedState: PreloadedState;
}

const ReduxProvider = (props: React.PropsWithChildren<Props>) => {
  const storeRef = React.useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = createStore(props.preloadedState);
  }

  return (
    <Provider store={storeRef.current}>
      { props.children }
    </Provider>
  );
};

export default ReduxProvider;
