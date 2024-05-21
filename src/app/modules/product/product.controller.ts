import { Request, Response } from "express";
import productValidatorSchema from "./product.validator";
import { ProductServices } from "./product.service";

/**
 * Controller Method to Insert Product into DB
 * @param req is a body containing product data
 * @param res result object after Inserting data into database
 */
const createNewProduct=async(req:Request,res:Response)=>{
    try {
        const product=req.body
        const {error,value}=productValidatorSchema.validate(product,{allowUnknown:true})
        if(error){
            res.status(500).send({
                succsess:false,
                messege:"Error occured while creating new product(Joi).Some fields maybe missing",
                error:error.details
            })
        }else{
            const result=await ProductServices.createNewProductIntoDB(value)
            res.status(200).send({
                succsess:true,
                messege:"Product created successfully!",
                data:result
            })
        }
    } catch (error:any) {
        res.status(500).send({
            succsess:false,
            messege:error.message||"Error occured while creating new product",
            error:error
        })
    }
}

/**
 * COntroller Method to get all products from database
 * @param req No input needed since this method fetches everything
 * @param res Returns a result object
 */
const getAllProducts=async(req:Request,res:Response)=>{
    try {
        const result =await ProductServices.getAllProductFromDB()
        res.status(200).send({
            success:true,
            messege:"Products fetched successfully!",
            data:result
        })
    } catch (error:any) {
        res.status(500).send({
            succsess:false,
            messege:error.message||"Error occured while fetching all products",
            error:error
        })
    }
}

export const ProductControllers={
    createNewProduct,
    getAllProducts
}