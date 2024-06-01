import { Model, Types } from "mongoose";

export type TOrder = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};

export type OrderMethods = {
  isExists(id: Types.ObjectId): Promise<TOrder | null>;
};

export type OrderModel = Model<TOrder, Record<string, never>, OrderMethods>;
