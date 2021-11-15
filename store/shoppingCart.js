import { createSlice, createSelector } from "@reduxjs/toolkit";

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
      console.log(i, shoppingList[i]);
      price += shoppingList[i].price;
    }
    return price;
    // return shoppingList.length >= 2
    //   ? shoppingList.reduce((a, b) => parseInt(a.price) + parseInt(b.price))
    //   : shoppingList[0].price;
  }
);

export const { sideBarShown, sideBarHidden, productAdded, productRemoved } =
  shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
