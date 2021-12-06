import axios from "axios";

const API_KEY = process.env.RAWGIO_API_KEY;
const API_URL = process.env.RAWGIO_API_URL;
const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const data = await getGames(req.query);
      console.log("Here");
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
};

export const getGames = async (queries = {}) => {
  const queryKeys = Object.keys(queries);
  const queryValues = Object.values(queries);
  const url = `${API_URL}/games?key=${API_KEY}${queryKeys
    .map((key, index) => `&${key}=${queryValues[index]}`)
    .join("")}`;
  const request = await axios.get(url);
  return request.data;
};

export default handler;
