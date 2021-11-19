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
  ordering: null,
  queryKey: null,
  queryValue: null,
  display: "grid",
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
      products.page = 1;
    },

    searchDateModified: (products, action) => {
      products.startDateStr = action.payload.startDateStr;
      products.endDateStr = action.payload.endDateStr;
    },

    searchOrderingModified: (products, action) => {
      products.ordering = action.payload;
    },

    querySet: (products, action) => {
      products.queryKey = action.payload.queryKey;
      products.queryValue = action.payload.queryValue;
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
      products.ordering = defaultState.ordering;
      products.queryKey = defaultState.queryKey;
      products.queryValue = defaultState.queryValue;
    },

    displaySet: (products, action) => {
      products.display = action.payload;
    },
  },
});

export const loadGames =
  (refreshState = false, query = null) =>
  (dispatch, getState) => {
    if (refreshState) dispatch(stateRefreshed());
    var queryKeys = null;
    var queryValues = null;
    var queryString = "";
    if (query) {
      queryKeys = Object.keys(query);
      queryValues = Object.values(query);
      queryKeys.forEach(
        (key, index) => (queryString += `&${key}=${queryValues[index]}`)
      );
    }
    // console.log(queryKeys);
    //console.log(queryValues);

    if (query)
      dispatch(
        querySet({ queryKey: queryKeys[0], queryValue: queryValues[0] })
      );

    console.log("queryString", queryString);
    const {
      pageSize,
      searchTerm,
      ordering,
      startDateStr,
      endDateStr,
      queryKey,
      queryValue,
    } = getState().entities.products;
    return dispatch(
      apiCallBegan({
        url: `games?key=273662619363477a9d8c149890fb482e&page_size=${pageSize}&page=${1}${
          searchTerm ? `&search=${searchTerm}` : ""
        }${ordering ? `&ordering=${ordering}` : ""}${
          startDateStr ? `&dates=${startDateStr},${endDateStr}` : ""
        }${query ? `&${queryString}` : ""}${
          !query && queryKey ? `&${queryKey}=${queryValue}` : ""
        }`,

        onStart: gamesRequested.type,
        onSuccess: gamesReceived.type,
        onError: gamesRequestFailed.type,
      })
    );
  };

// const defaultParams = {
//   searchTerm: "",
//   pageSize: "",
// };
// export const loadGames = () => (dispatch, getState) => {};

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

export const loadNextWeek = () => (dispatch, getState) => {
  const today = moment();
  const fromDate = today.startOf("week").add(7, "days").format("YYYY-MM-DD");
  const to = today.endOf("week").add(7, "days").format("YYYY-MM-DD");
  console.log(fromDate, to);
  const { pageSize, page, searchTerm } = getState().entities.products;
  dispatch(searchDateModified({ startDateStr: fromDate, endDateStr: to }));
  return dispatch(
    apiCallBegan({
      url: `games?key=273662619363477a9d8c149890fb482e&page_size=${pageSize}&page=${page}${
        searchTerm ? `&search=${searchTerm}` : ""
      }&dates=${fromDate},${to}`,
      onStart: gamesRequested.type,
      onSuccess: gamesReceived.type,
      onError: gamesRequestFailed.type,
    })
  );
};

export const loadThisWeek = () => (dispatch, getState) => {
  const today = moment();
  const fromDate = today.startOf("week").format("YYYY-MM-DD");
  const to = today.endOf("week").format("YYYY-MM-DD");
  // console.log(fromDate, to);
  const { pageSize, page, searchTerm } = getState().entities.products;
  dispatch(searchDateModified({ startDateStr: fromDate, endDateStr: to }));
  return dispatch(
    apiCallBegan({
      url: `games?key=273662619363477a9d8c149890fb482e&page_size=${pageSize}&page=${page}${
        searchTerm ? `&search=${searchTerm}` : ""
      }&dates=${fromDate},${to}`,
      onStart: gamesRequested.type,
      onSuccess: gamesReceived.type,
      onError: gamesRequestFailed.type,
    })
  );
};

export const loadBestOfTheYear = () => (dispatch, getState) => {
  const today = moment();
  const fromDate = today.startOf("year").format("YYYY-MM-DD");
  const to = today.endOf("year").format("YYYY-MM-DD");
  const { pageSize, page, searchTerm } = getState().entities.products;
  const rating = "-metacritic";
  dispatch(searchDateModified({ startDateStr: fromDate, endDateStr: to }));
  dispatch(searchOrderingModified(rating));
  return dispatch(
    apiCallBegan({
      url: `games?key=273662619363477a9d8c149890fb482e&page_size=${pageSize}&page=${page}${
        searchTerm ? `&search=${searchTerm}` : ""
      }&dates=${fromDate},${to}&ordering=${rating}`,
      onStart: gamesRequested.type,
      onSuccess: gamesReceived.type,
      onError: gamesRequestFailed.type,
    })
  );
};

export const loadPopularIn2020 = () => (dispatch, getState) => {
  const fromDate = "2020-01-01";
  const to = "2020-12-30";
  const { pageSize, page, searchTerm } = getState().entities.products;
  const ordering = "-metacritic";
  dispatch(searchDateModified({ startDateStr: fromDate, endDateStr: to }));
  dispatch(searchOrderingModified(ordering));
  return dispatch(
    apiCallBegan({
      url: `games?key=273662619363477a9d8c149890fb482e&page_size=${pageSize}&page=${page}${
        searchTerm ? `&search=${searchTerm}` : ""
      }&dates=${fromDate},${to}&ordering=${ordering}`,
      onStart: gamesRequested.type,
      onSuccess: gamesReceived.type,
      onError: gamesRequestFailed.type,
    })
  );
};

export const loadTop250 = () => (dispatch, getState) => {
  const { pageSize, page, searchTerm } = getState().entities.products;
  const ordering = "-metacritic";
  dispatch(searchOrderingModified(ordering));
  return dispatch(
    apiCallBegan({
      url: `games?key=273662619363477a9d8c149890fb482e&page_size=${pageSize}&page=${page}${
        searchTerm ? `&search=${searchTerm}` : ""
      }&ordering=${ordering}`,
      onStart: gamesRequested.type,
      onSuccess: gamesReceived.type,
      onError: gamesRequestFailed.type,
    })
  );
};

export const loadMoreGames = () => (dispatch, getState) => {
  const {
    pageSize,
    page,
    searchTerm,
    startDateStr,
    endDateStr,
    ordering,
    queryKey,
    queryValue,
  } = getState().entities.products;
  const url = `games?key=273662619363477a9d8c149890fb482e&page_size=${pageSize}&page=${
    page + 1
  }${searchTerm ? `&search=${searchTerm}` : ""}${
    ordering ? `&ordering=${ordering}` : ""
  }${startDateStr ? `&dates=${startDateStr},${endDateStr}` : ""}${
    queryKey ? `&${queryKey}=${queryValue}` : ""
  }`;
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
  dispatch(searchTermChanged(searchTerm));
  return dispatch(loadGames());
};

export const sortBy = (field, query) => (dispatch, getState) => {
  dispatch(searchOrderingModified(field));
  return dispatch(loadGames(false, query));
};

export const refreshState = () => (dispatch, getState) => {
  return dispatch(stateRefreshed());
};

export const setProductsDisplay = (type) => (dispatch, getState) => {
  return dispatch(displaySet(type));
};

export const getDisplay = createSelector(
  (state) => state.entities.products,
  (products) => products.display
);

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
  searchOrderingModified,
  querySet,
  displaySet,
} = productsSlice.actions;
export default productsSlice.reducer;
