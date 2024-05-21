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

export const ProductServices={
    createNewProductIntoDB,
    getAllProductFromDB,
    getProductByIDfromDB
}