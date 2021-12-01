import { createSlice, createSelector } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const defaultState = {
  sideBarVisible: false,
  list: [],
};
const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: defaultState,
  reducers: {
    sideBarShown: (shoppingCart) => {
      shoppingCart.sideBarVisible = true;
    },

    sideBarHidden: (shoppingCart) => {
      shoppingCart.sideBarVisible = false;
    },

    productAdded: (shoppingCart, action) => {
      shoppingCart.list.push(action.payload);
    },

    productRemoved: (shoppingCart, action) => {
      let { id, selectedPlatform } = action.payload;
      shoppingCart.list = shoppingCart.list.filter(
        (product) =>
          product.id !== id &&
          selectedPlatform.value !== product.selectedPlatform.value
      );
    },
    // extraReducers: (builder) => {
    //   builder.addCase(PURGE, (state) => {
    //     customEntityAdapter.removeAll(state);
    //   });
    // },
    cartCleared: (shoppingCart) => {
      shoppingCart.list = [];
    },
  },
});

export const showShoppingCartSideBar = () => (dispatch) => {
  document.body.classList.add("stop-scrolling");
  return dispatch(sideBarShown());
};

export const hideShoppingCartSideBar = () => (dispatch) => {
  document.body.classList.remove("stop-scrolling");
  return dispatch(sideBarHidden());
};

export const addToCart = (game, selectedOption) => (dispatch) => {
  return dispatch(productAdded({ ...game, selectedPlatform: selectedOption }));
};

export const removeFromCart = (id, selectedOption) => (dispatch) => {
  return dispatch(productRemoved({ id, selectedPlatform: selectedOption }));
};

export const clearCart = () => (dispatch) => {
  return dispatch(cartCleared());
};

export const getIsAddedToCart = (id, platform) =>
  createSelector(
    (state) => state.entities.shoppingCart,
    (shoppingCart) => {
      return shoppingCart.list.some(
        (product) =>
          product.id === id &&
          platform?.value === product.selectedPlatform?.value
      );
    }
  );

export const getSubtotal = createSelector(
  (state) => state.entities.shoppingCart.list,
  (shoppingList) => {
    if (shoppingList.length === 0) return 0;
    var price = 0;
    for (var i = 0; i < shoppingList.length; i++) {
      price += shoppingList[i].price;
    }
    return price;
    // return shoppingList.length >= 2
    //   ? shoppingList.reduce((a, b) => parseInt(a.price) + parseInt(b.price))
    //   : shoppingList[0].price;
  }
);

export const getTotalItems = createSelector(
  (state) => state.entities.shoppingCart.list,
  (shoppingList) => shoppingList.length
);

export const {
  sideBarShown,
  sideBarHidden,
  productAdded,
  productRemoved,
  cartCleared,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
