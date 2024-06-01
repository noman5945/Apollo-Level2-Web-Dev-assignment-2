import { Schema, Types, model } from "mongoose";
import {
  ProductModel,
  TInventory,
  TProduct,
  TVariant,
} from "./product.interface";

const variantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
});

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
});

productSchema.methods.isExists = async function (id: Types.ObjectId) {
  const existingData = await Product.findOne({ _id: id });
  return existingData;
};

export const Product = model<TProduct, ProductModel>("Product", productSchema);
