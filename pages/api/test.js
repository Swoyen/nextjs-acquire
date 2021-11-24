const handler = async (req, res) => {
  if (req.method === "GET") {
    res.status(200).json({ message: "Hello" });
  }
};

export default handler;
