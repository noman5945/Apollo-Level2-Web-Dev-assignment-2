import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createNewProductIntoDB=async(productData:TProduct)=>{
        const product=new Product(productData)
        if(await product.isExists(product.productId)){
            throw new Error('Product already exists')
        }
        const result=await product.save()
        return result
}

export const ProductServices={
    createNewProductIntoDB
}