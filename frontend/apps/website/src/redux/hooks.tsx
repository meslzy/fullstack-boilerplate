import * as redux from "react-redux";

import { AppDispatch, AppStore, RootState } from "./store";

const useStore = redux.useStore.withTypes<AppStore>();
const useSelector = redux.useSelector.withTypes<RootState>();
const useDispatch = redux.useDispatch.withTypes<AppDispatch>();

export {
  useStore,
  useSelector,
  useDispatch,
};
