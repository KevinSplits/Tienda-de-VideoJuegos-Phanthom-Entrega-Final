import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
      },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Sale", saleSchema);