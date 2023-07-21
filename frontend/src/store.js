import { combineReducers, configureStore } from "@reduxjs/toolkit";
import NotificationReducer from "./reducers/NotificationReducer";
import BlogReducer from "./reducers/BlogReducer";
import UserReducer from "./reducers/UserReducer";

const reducer = combineReducers({
  notification: NotificationReducer,
  blogs: BlogReducer,
  user: UserReducer,
});
export const setupStore = (preloadedState = {}) => {
  return configureStore({
    reducer: reducer,
    preloadedState,
  });
};
