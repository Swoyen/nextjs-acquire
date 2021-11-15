import axios from "axios";

export const getGames = async (pageSize = 10, page = 1, searchTerm = null) => {
  try {
    const url = `https://api.rawg.io/api/games?key=273662619363477a9d8c149890fb482e&page_size=${pageSize}&page=${page}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`;
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

export const getStores = async () => {
  try {
    const url = `https://api.rawg.io/api/stores?page_size=100&key=273662619363477a9d8c149890fb482e`;
    return await axios.get(url);
  } catch (e) {}
};
