import axios from "axios";

const API_KEY = process.env.RAWGIO_API_KEY;
const API_URL = process.env.RAWGIO_API_URL;

export const getGame = async (slug) => {
  try {
    const url = `${API_URL}/games/${slug}?key=${API_KEY}`;
    const request = await axios.get(url);

    return request.data;
  } catch (err) {
    console.error(err);
    return {};
  }
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { slug } = req.query;
      const data = await getGame(slug);
      return res.status(200).json(data);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default handler;
