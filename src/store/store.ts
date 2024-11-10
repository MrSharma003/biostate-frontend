import { combineReducers, configureStore } from "@reduxjs/toolkit";
import substringReducer from "../store/substring/substringSlice";
import authReducer from "../store/auth/slice";
import {
  TypedUseSelectorHook,
  useSelector as useAppSelector,
} from "react-redux";
import binarytreeReducer from "../features/binary-tree/middleware";

const rootReducer = combineReducers({
  substring: substringReducer,
  auth: authReducer,
  binarytree: binarytreeReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
export default store;
