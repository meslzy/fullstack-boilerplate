import React from "react";

import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";


const store = configureStore({
  reducer: {}
});

interface Props {
  children: React.ReactNode;
}

const ReduxProvider = (props: Props) => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
};

export default ReduxProvider;