import axios from "axios";

const API_KEY = process.env.RAWGIO_API_KEY;
const API_URL = process.env.RAWGIO_API_URL;

export const getPlatforms = async () => {
  try {
    const url = `${API_URL}/platforms?page_size=100&key=${API_KEY}`;
    console.log(url);
    const response = await axios.get(url);
    return response.data.results;
  } catch (e) {
    return {};
  }
};

export const getStores = async () => {
  try {
    const url = `${API_URL}/stores?page_size=100&key=${API_KEY}`;
    console.log(url);
    const response = await axios.get(url);
    return response.data.results;
  } catch (e) {
    return {};
  }
};

export const getCreators = async () => {
  try {
    const url = `${API_URL}/creators?page_size=100&key=${API_KEY}`;
    console.log(url);
    const response = await axios.get(url);
    return response.data.results;
  } catch (e) {
    return {};
  }
};

export const getTags = async () => {
  try {
    const url = `${API_URL}/tags?page_size=100&key=${API_KEY}`;
    console.log(url);
    const response = await axios.get(url);
    return response.data.results;
  } catch (e) {
    return {};
  }
};

export const getDevelopers = async () => {
  try {
    const url = `${API_URL}/developers?page_size=100&key=${API_KEY}`;
    console.log(url);
    const response = await axios.get(url);
    return response.data.results;
  } catch (e) {
    return {};
  }
};

export const getPublishers = async () => {
  try {
    const url = `${API_URL}/publishers?page_size=100&key=${API_KEY}`;
    console.log(url);
    const response = await axios.get(url);
    return response.data.results;
  } catch (e) {
    return {};
  }
};

const handler = async (req, res) => {
  return res.status(200).json({ msg: "OK" });
};

export default handler;
