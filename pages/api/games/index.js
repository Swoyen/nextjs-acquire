import axios from "axios";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      // SEND request
      const API_KEY = process.env.RAWGIO_API_KEY;
      const API_URL = process.env.RAWGIO_API_URL;

      const queryKeys = Object.keys(req.query);
      const queryValues = Object.values(req.query);
      const url = `${API_URL}/games?key=${API_KEY}${queryKeys
        .map((key, index) => `&${key}=${queryValues[index]}`)
        .join("")}`;

      const request = await axios.get(url);
      return res.status(200).json(request.data);
      // console.log("reqreq-------------------");
      // console.log(url);
    } catch (err) {
      console.log(err);
    }
  }
};
export default handler;
