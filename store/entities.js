import { combineReducers } from "redux";
import productsReducer from "./products";
import shoppingCartReducer from "./shoppingCart";

export default combineReducers({
  products: productsReducer,
  shoppingCart: shoppingCartReducer,
});
