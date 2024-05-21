import { Schema, model } from "mongoose";
import { ProductModel, TInventory, TProduct, TVariant } from "./product.interface";

const variantSchema=new Schema<TVariant>({
    type:{type:String,required:true},
    value:{type:String,required:true}
})

const inventorySchema=new Schema<TInventory>({
    quantity:{type:Number,required:true},
    inStock:{type:Boolean,default:true}
})

const productSchema=new Schema<TProduct>({
    productId:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    tags:{type:[String],required:true},
    variants:{type:[variantSchema],required:true},
    inventory:{type:inventorySchema,required:true}
})

productSchema.methods.isExists=async function (id:string) {
    const existingData=Product.findOne({productId:id})
    return existingData
}

export const Product=model<TProduct,ProductModel>('Product',productSchema)