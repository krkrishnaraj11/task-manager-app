import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import taskReducer from "./slices/task/taskSlice";
import logger from "redux-logger";
import reactotron from "../../ReactotronConfig";

let middlewares = [];

// // add logger middleware when app is running in debug mode
if (__DEV__) {
  middlewares = [logger];
}

const createEnhancers = (getDefaultEnhancers: GetDefaultEnhancers<any>) => {
  if (__DEV__) {
    const reactotron = require("../../ReactotronConfig").default
    return getDefaultEnhancers().concat(reactotron.createEnhancer())
  } else {
    return getDefaultEnhancers()
  }
}

const store = configureStore({
  reducer: {
    user: authReducer,
    tasks: taskReducer,
  },
  enhancers: createEnhancers,
  middlewares: (getDefaultMiddleware) => {
    getDefaultMiddleware().concat(logger)
  }
});

export default store;