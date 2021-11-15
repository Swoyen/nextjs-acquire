import { createSelector, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { getGames } from "../api";
import { apiCallBegan } from "./api";

const defaultState = {
  page: 1,
  games: [],
  pageSize: 10,
  searchTerm: "",
  loading: false,
  moreLoading: false,
  lastFetch: null,
  startDateStr: null,
  endDateStr: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState: defaultState,
  reducers: {
    gamesRequested: (products, action) => {
      products.loading = true;
      products.lastFetch = Date.now();
    },

    gamesReceived: (products, action) => {
      products.games = action.payload.results;
      products.loading = false;

      products.page = 1;
    },

    gamesRequestFailed: (products, action) => {
      products.loading = false;
    },

    moreGamesRequested: (products, action) => {
      products.moreLoading = true;
    },

    moreGamesReceived: (products, action) => {
      products.moreLoading = false;
      products.games = [...products.games, ...action.payload.results];

      products.page += 1;
      console.log("page", products.page);
    },

    moreGamesRequestFailed: (products, action) => {
      products.loading = false;
    },

    searchTermChanged: (products, action) => {
      products.searchTerm = action.payload;
    },

    searchDateModified: (products, action) => {
      products.startDateStr = action.payload.startDateStr;
      products.endDateStr = action.payload.endDateStr;
    },

    stateRefreshed: (products, action) => {
      products.page = defaultState.page;
      products.games = defaultState.games;
      products.pageSize = defaultState.pageSize;
      products.searchTerm = defaultState.searchTerm;
      products.loading = defaultState.loading;
      products.moreLoading = defaultState.moreLoading;
      products.lastFetch = defaultState.lastFetch;
      products.startDateStr = defaultState.startDateStr;
      products.endDateStr = defaultState.endDateStr;
    },
  },
});

export const loadGames = () => (dispatch, getState) => {
  const { pageSize, searchTerm } = getState().entities.products;
  return dispatch(
    apiCallBegan({
      url: `games?key=273662619363477a9d8c149890fb482e&page_size=${pageSize}&page=${1}${
        searchTerm ? `&search=${searchTerm}` : ""
      }`,

      onStart: gamesRequested.type,
      onSuccess: gamesReceived.type,
      onError: gamesRequestFailed.type,
    })
  );
};

export const loadLast30Days = () => (dispatch, getState) => {
  const today = new Date();
  const thirtyDaysAgo = new Date().setDate(today.getDate() - 30);
  let startDate = new Date(thirtyDaysAgo);
  let endDate = today;
  let startDateStr = moment(startDate).format("YYYY-MM-DD");
  let endDateStr = moment(endDate).format("YYYY-MM-DD");
  const { pageSize, page, searchTerm } = getState().entities.products;
  dispatch(searchDateModified({ startDateStr, endDateStr }));
  return dispatch(
    apiCallBegan({
      url: `games?key=273662619363477a9d8c149890fb482e&page_size=${pageSize}&page=${page}${
        searchTerm ? `&search=${searchTerm}` : ""
      }&dates=${startDateStr},${endDateStr}`,
      onStart: gamesRequested.type,
      onSuccess: gamesReceived.type,
      onError: gamesRequestFailed.type,
    })
  );
};

export const loadMoreGames = () => (dispatch, getState) => {
  const { pageSize, page, searchTerm, startDateStr, endDateStr } =
    getState().entities.products;
  const url = `games?key=273662619363477a9d8c149890fb482e&page_size=${pageSize}&page=${
    page + 1
  }${searchTerm ? `&search=${searchTerm}` : ""}${
    startDateStr ? `&dates=${startDateStr},${endDateStr}` : ""
  }`;
  console.log({ url });
  return dispatch(
    apiCallBegan({
      url,
      onStart: moreGamesRequested.type,
      onSuccess: moreGamesReceived.type,
      onError: moreGamesRequestFailed.type,
    })
  );
};

export const searchGame = (searchTerm) => (dispatch, getState) => {
  const { pageSize } = getState().entities.products;
  dispatch(searchTermChanged(searchTerm));
  return dispatch(
    apiCallBegan({
      url: `games?key=273662619363477a9d8c149890fb482e&page_size=${pageSize}&page=${1}${
        searchTerm ? `&search=${searchTerm}` : ""
      }`,
      onStart: gamesRequested.type,
      onSuccess: gamesReceived.type,
      onError: gamesRequestFailed.type,
    })
  );
};

export const refreshState = () => (dispatch, getState) => {
  return dispatch(stateRefreshed());
};

// export const getAllSeverities = createSelector(
//   (state) => state.entities.severities,
//   (severities) => severities.list
// );

export const {
  gamesRequested,
  gamesReceived,
  gamesRequestFailed,
  moreGamesRequested,
  moreGamesReceived,
  moreGamesRequestFailed,
  searchTermChanged,
  stateRefreshed,
  searchDateModified,
} = productsSlice.actions;
export default productsSlice.reducer;
