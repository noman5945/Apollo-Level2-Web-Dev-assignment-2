import { Schema } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema=new Schema<TOrder>({
    orderID:{type:String,required:true,unique:true},
    
})