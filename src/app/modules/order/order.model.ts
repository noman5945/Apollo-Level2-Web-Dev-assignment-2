import { Schema, model } from "mongoose";
import { OrderModel, TOrder } from "./order.interface";

const OrderSchema=new Schema<TOrder>({
    orderID:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    productId:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true}
})

OrderSchema.methods.isExists=async function (id:string) {
    const existingData=await Order.findOne({orderID:id})
    return existingData 
}

export const Order=model<TOrder,OrderModel>('order',OrderSchema)