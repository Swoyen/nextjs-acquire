import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    products: [
      {
        rawgId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: String, required: true },
        background: String,
        platform: { type: String, required: true },
      },
    ],
    total: { type: Number },
    receipt: { type: String, required: true },
  },
  { timestamps: true }
);

let Dataset = mongoose.models.orders || mongoose.model("orders", orderSchema);
export default Dataset;
