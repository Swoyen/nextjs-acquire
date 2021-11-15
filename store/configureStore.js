import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import api from "./middleware/api";
// import * as actions from "./api";

const configStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleWare) =>
      getDefaultMiddleWare().concat([logger({ destination: "console" }), api]),
  });
};

export default configStore;
