import React from "react";

import { PreloadedState } from "~redux/store";

import ReduxProvider from "~redux/provider";

const ReduxPreloader = async (props: React.PropsWithChildren) => {
  const preloadedState: PreloadedState = {};

  return (
    <ReduxProvider preloadedState={preloadedState}>
      { props.children }
    </ReduxProvider>
  );
};

export default ReduxPreloader;
