import connectDB from "../../../config/connectDB";
import Orders from "../../../models/orderModel";
import { getSession } from "next-auth/client";

connectDB();
export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;
    case "GET":
      await getOrders(req, res);
      break;
  }
}

const createOrder = async (req, res) => {
  try {
    const session = await getSession({ req });
    if (!session)
      return res
        .status(200)
        .json({ msg: "Order not stored as not authenticated!" });

    const { userId } = session;

    const order = req.body;
    if (!order) return res.status(400).json({ msg: "No orders passed" });

    const orderExists = await Orders.exists({ _id: order._id });
    if (orderExists) return res.status(400).json("Order entry already exists");

    const newOrder = new Orders({ ...order, user: userId });
    await newOrder.save();

    return res.status(200).json({ newOrder });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const session = await getSession({ req });
    if (!session)
      return res.status(400).json({ msg: "Invalid Authentication!" });

    const orders = getOrdersFromApi(session);
    return res.status(200).json({ orders });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getOrdersFromApi = async (session) => {
  const { userId } = session;
  const orders = await Orders.where("user").equals(userId);
  return orders;
};
