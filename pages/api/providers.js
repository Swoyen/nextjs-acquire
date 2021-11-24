import { getProviders } from "next-auth/client";
import connectDB from "../../config/connectDB";
connectDB();
export default async (req, res) => {
  const providers = await getProviders();
  return res.status(200).json({ providers });
};
