import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import api from "./middleware/api";
// import * as actions from "./api";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const configStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleWare) =>
      getDefaultMiddleWare({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([logger({ destination: "console" }), api]),
  });
};

export const store = configStore();

export const persistor = persistStore(store);
