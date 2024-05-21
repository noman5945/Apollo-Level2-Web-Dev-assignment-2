import { Model } from "mongoose";

export type TOrder={
    orderID:string;
    email:string;
    productId:string;
    price:number;
    quantity:number;
}

export type OrderMethods={
    isExists(id:string):Promise<TOrder|null>
}

export type OrderModel=Model<TOrder,Record<string,never>,OrderMethods>