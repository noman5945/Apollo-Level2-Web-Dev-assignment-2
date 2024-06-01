import { Types } from "mongoose";
import { Product } from "../product/product.model";
import { ProductServices } from "../product/product.service";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

/**
 * Method to create order then subtract the product qty from inventory and insert into DB
 * @param orderData - Newly created Order document
 * @returns
 */
const createOrderIntoDB = async (orderData: TOrder) => {
  const order = new Order(orderData);

  const product = new Product();
  const existingProduct = await product.isExists(
    new Types.ObjectId(orderData.productId)
  );
  if (!existingProduct) {
    throw new Error("Such product does not exist");
  }
  if (!existingProduct.inventory.inStock) {
    throw new Error("Sorry. Product out of stock");
  }
  if (existingProduct.inventory.quantity < order.quantity) {
    throw new Error(
      "You are ordering more than we have in stock.We dont have that much product sorry."
    );
  }
  existingProduct.inventory.quantity -= order.quantity;
  if (existingProduct.inventory.quantity <= 0) {
    existingProduct.inventory.quantity = 0;
    existingProduct.inventory.inStock = false;
  }
  await ProductServices.upsertProductByIDfromDB(
    order.productId,
    existingProduct
  );
  const result = await order.save();
  return result;
};

const getOrderByEmailfromDB = async (email: string) => {
  const orders = await Order.find({ email: email });
  if (orders.length < 1) {
    throw new Error("Order not found");
  }
  return orders;
};

const getAllOrdersfromDB = async () => {
  const orders = await Order.find({});
  return orders;
};

export const OrderService = {
  createOrderIntoDB,
  getOrderByEmailfromDB,
  getAllOrdersfromDB,
};
