import { Schema, Types, model } from "mongoose";
import { OrderModel, TOrder } from "./order.interface";

const OrderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

OrderSchema.methods.isExists = async function (id: Types.ObjectId) {
  const existingData = await Order.findOne({ _id: id });
  return existingData;
};

export const Order = model<TOrder, OrderModel>("order", OrderSchema);
