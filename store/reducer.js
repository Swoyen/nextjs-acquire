import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import entitiesReducer from "./entities";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["entities"],
};

// const entitiesPersistConfig = {
//   key: "entities",
//   storage,
//   blacklist: ["products"],
// };

const rootReducer = combineReducers({
  entities: entitiesReducer,
});

export default persistReducer(persistConfig, rootReducer);
