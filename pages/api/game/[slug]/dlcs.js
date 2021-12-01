import axios from "axios";

const API_KEY = process.env.RAWGIO_API_KEY;
const API_URL = process.env.RAWGIO_API_URL;

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { slug } = req.query;
      const url = `${API_URL}/games/${slug}/additions?key=${API_KEY}`;
      const response = await axios.get(url);
      return res.status(200).json(response.data.results);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }
};

export default handler;
