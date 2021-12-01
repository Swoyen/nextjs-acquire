// import axios from "axios";

// export const getGames = async (
//   pageSize = 10,
//   page = 1,
//   searchTerm = null,
//   platforms = null
// ) => {
//   try {
//     const url = `https://api.rawg.io/api/games?&page_size=${pageSize}&page=${page}${
//       searchTerm ? `&search=${searchTerm}` : ""
//     }${platforms ? `&platforms=${platforms}` : ""}`;
//     return await axios.get(url);
//   } catch (e) {}
// };

// export const getGamesA = async (
//   query = { pageSize: 10, page: 1, searchTerm: null, platforms: null }
// ) => {
//   try {
//     const pageSize = query.pageSize ? query.pageSize : 10;
//     const page = query.page ? query.page : 1;
//     const url = `https://api.rawg.io/api/games?&page_size=${pageSize}&page=${page}${
//       query.searchTerm ? `&search=${query.searchTerm}` : ""
//     }${query.platforms ? `&platforms=${query.platforms}` : ""}`;
//     return await axios.get(url);
//   } catch (e) {}
// };

// export const getGame = async (slug) => {
//   try {
//     const url = `https://api.rawg.io/api/games/${slug}?`;

//     return await axios.get(url);
//   } catch (e) {}
// };

// // export const fetchGame = async (slug) => {
// //   try {
// //     const res = await fetch(
// //       `https://api.rawg.io/api/games/${slug}?`
// //     );
// //     const json = await res.json();
// //     const results = json;
// //     return results;
// //   } catch (e) {}
// // };

// export const getGameTrailer = async (slug) => {
//   try {
//     const url = `https://api.rawg.io/api/games/${slug}/movies?`;
//     return await axios.get(url);
//   } catch (e) {}
// };

// export const getScreenshots = async (slug) => {
//   try {
//     const url = `https://api.rawg.io/api/games/${slug}/screenshots?`;
//     return await axios.get(url);
//   } catch (e) {}
// };

// export const getDlcs = async (slug) => {
//   try {
//     const url = `https://api.rawg.io/api/games/${slug}/additions?`;
//     return await axios.get(url);
//   } catch (e) {}
// };

// export const getSeries = async (slug) => {
//   try {
//     const url = `https://api.rawg.io/api/games/${slug}/game-series?`;
//     return await axios.get(url);
//   } catch (e) {}
// };

// export const getParentGames = async (slug) => {
//   try {
//     const url = `https://api.rawg.io/api/games/${slug}/parent-games?`;
//     return await axios.get(url);
//   } catch (e) {}
// };

// export const getPageTitle = async (query) => {
//   try {
//     const url = `https://api.rawg.io/api/${query.query.value}?&`;
//     return await axios.get(url);
//   } catch (e) {}
// };

// export const getGenres = async () => {
//   try {
//     const url = `https://api.rawg.io/api/genres?&`;
//     return await axios.get(url);
//   } catch (e) {}
// };
