import { Request, Response } from "express";
import productValidatorSchema from "./product.validator";
import { ProductServices } from "./product.service";

const createNewProduct=async(req:Request,res:Response)=>{
    try {
        const product=req.body
        const {error,value}=productValidatorSchema.validate(product,{allowUnknown:true})
        if(error){
            res.status(500).send({
                succsess:false,
                messege:"Error occured while creating new product(Joi)",
                error:error.details
            })
        }else{
            const result=await ProductServices.createNewProductIntoDB(value)
            res.status(200).send({
                succsess:true,
                messege:"Product created successfully!",
                error:result
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

export const ProductControllers={
    createNewProduct
}