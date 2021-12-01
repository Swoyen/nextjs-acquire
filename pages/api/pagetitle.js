import axios from "axios";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const API_KEY = process.env.RAWGIO_API_KEY;
      const API_URL = process.env.RAWGIO_API_URL;

      const section = Object.keys(req.query)[0];
      const id = Object.values(req.query)[0];

      const url = `${API_URL}/${section}/${id}?key=${API_KEY}`;
      const response = await axios.get(url);
      return res.status(200).json(response.data.name);
    }
  } catch (err) {
    return res.status(500).json(err.response);
  }
};
export default handler;
