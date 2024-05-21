import { TProduct } from "./product.interface";
import { Product } from "./product.model";

/**
 * Method to insert new product into Database
 * @param {TProduct} productData Which is the newly created product
 * @returns Object of inserted data
 */
const createNewProductIntoDB=async(productData:TProduct)=>{
        const product=new Product(productData)
        if(await product.isExists(product.productId)){
            throw new Error('Product already exists')
        }
        const result=await product.save()
        return result
}

/**
 * Method to get all data from database
 * @returns {Array} Array of all data  
 */
const getAllProductFromDB=async()=>{
    const result=await Product.find({})
    return result
}

/**
 * Method to get Product by ID
 * @param id ID of the quering Product 
 * @returns The product object
 */
const getProductByIDfromDB=async(id:string)=>{
    const query={productId:id}
    const result=await Product.findOne(query)
    return result
}
/**
 * Method to update then insert updated data by ID.This method employes 'PUT' method
 * @param id ID of the product to be updated
 * @param newData Data of type TProduct having the updated property
 * @returns Updated data
 */
const upsertProductByIDfromDB=async(id:string,newData:TProduct)=>{
    const filter={productId:id}
    const updatedData:TProduct=newData
    const result=await Product.findOneAndUpdate(filter,updatedData,{upsert:true})
    return result
}

/**
 * Method to delete product by ID 
 * @param id 
 * @returns 
 */
const deleteProductByIDfromDB=async(id:string)=>{
    const filter={productId:id}
    const result=await Product.findOneAndDelete(filter)
    return result
}

const searchProductByKeywordfromDB=async(keyword:string)=>{
    console.log(keyword)
    const query={
        tags:{
            '$regex':keyword
        }
    }
    const result=await Product.find(query)
    return result
}

export const ProductServices={
    createNewProductIntoDB,
    getAllProductFromDB,
    getProductByIDfromDB,
    upsertProductByIDfromDB,
    deleteProductByIDfromDB,
    searchProductByKeywordfromDB
}