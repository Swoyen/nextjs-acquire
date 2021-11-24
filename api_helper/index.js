import axios from "axios";

export const getGames = async (
  pageSize = 10,
  page = 1,
  searchTerm = null,
  platforms = null
) => {
  try {
    const url = `https://api.rawg.io/api/games?key=273662619363477a9d8c149890fb482e&page_size=${pageSize}&page=${page}${
      searchTerm ? `&search=${searchTerm}` : ""
    }${platforms ? `&platforms=${platforms}` : ""}`;
    return await axios.get(url);
  } catch (e) {}
};

export const getGamesA = async (
  query = { pageSize: 10, page: 1, searchTerm: null, platforms: null }
) => {
  try {
    const pageSize = query.pageSize ? query.pageSize : 10;
    const page = query.page ? query.page : 1;
    const url = `https://api.rawg.io/api/games?key=273662619363477a9d8c149890fb482e&page_size=${pageSize}&page=${page}${
      query.searchTerm ? `&search=${query.searchTerm}` : ""
    }${query.platforms ? `&platforms=${query.platforms}` : ""}`;
    return await axios.get(url);
  } catch (e) {}
};

export const getGame = async (slug) => {
  try {
    const url = `https://api.rawg.io/api/games/${slug}?key=273662619363477a9d8c149890fb482e`;

    return await axios.get(url);
  } catch (e) {}
};

// export const fetchGame = async (slug) => {
//   try {
//     const res = await fetch(
//       `https://api.rawg.io/api/games/${slug}?key=273662619363477a9d8c149890fb482e`
//     );
//     const json = await res.json();
//     const results = json;
//     return results;
//   } catch (e) {}
// };

export const getGameTrailer = async (slug) => {
  try {
    const url = `https://api.rawg.io/api/games/${slug}/movies?key=273662619363477a9d8c149890fb482e`;
    return await axios.get(url);
  } catch (e) {}
};

export const getScreenshots = async (slug) => {
  try {
    const url = `https://api.rawg.io/api/games/${slug}/screenshots?key=273662619363477a9d8c149890fb482e`;
    return await axios.get(url);
  } catch (e) {}
};

export const getDlcs = async (slug) => {
  try {
    const url = `https://api.rawg.io/api/games/${slug}/additions?key=273662619363477a9d8c149890fb482e`;
    return await axios.get(url);
  } catch (e) {}
};

export const getSeries = async (slug) => {
  try {
    const url = `https://api.rawg.io/api/games/${slug}/game-series?key=273662619363477a9d8c149890fb482e`;
    return await axios.get(url);
  } catch (e) {}
};

export const getParentGames = async (slug) => {
  try {
    const url = `https://api.rawg.io/api/games/${slug}/parent-games?key=273662619363477a9d8c149890fb482e`;
    return await axios.get(url);
  } catch (e) {}
};

export const getPlatforms = async () => {
  try {
    const url = `https://api.rawg.io/api/platforms?page_size=100&key=273662619363477a9d8c149890fb482e`;
    return await axios.get(url);
  } catch (e) {}
};

export const getPlatformGames = async (id) => {
  try {
    const url = `https://api.rawg.io/api/platforms/${id}?page_size=100&key=273662619363477a9d8c149890fb482e`;
    return await axios.get(url);
  } catch (e) {}
};

export const getStores = async () => {
  try {
    const url = `https://api.rawg.io/api/stores?page_size=100&key=273662619363477a9d8c149890fb482e`;
    return await axios.get(url);
  } catch (e) {}
};

export const getCreators = async () => {
  try {
    const url = `https://api.rawg.io/api/creators?page_size=100&key=273662619363477a9d8c149890fb482e`;
    return await axios.get(url);
  } catch (e) {}
};

export const getTags = async () => {
  try {
    const url = `https://api.rawg.io/api/tags?page_size=100&key=273662619363477a9d8c149890fb482e`;
    return await axios.get(url);
  } catch (e) {}
};

export const getDevelopers = async () => {
  try {
    const url = `https://api.rawg.io/api/developers?page_size=100&key=273662619363477a9d8c149890fb482e`;
    return await axios.get(url);
  } catch (e) {}
};

export const getPublishers = async () => {
  try {
    const url = `https://api.rawg.io/api/publishers?page_size=100&key=273662619363477a9d8c149890fb482e`;
    return await axios.get(url);
  } catch (e) {}
};

export const getPageTitle = async (query) => {
  try {
    const url = `https://api.rawg.io/api/${query.key}/${query.value}?&key=273662619363477a9d8c149890fb482e`;
    return await axios.get(url);
  } catch (e) {}
};

export const getGenres = async () => {
  try {
    const url = `https://api.rawg.io/api/genres?&key=273662619363477a9d8c149890fb482e`;
    return await axios.get(url);
  } catch (e) {}
};
