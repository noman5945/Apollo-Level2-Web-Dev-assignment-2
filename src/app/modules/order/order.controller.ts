import { Request, Response } from "express";
import { OrderService } from "./order.service";
import orderValidationSchema from "./order.validator";

const createNewOrder=async(req:Request,res:Response)=>{
    try {
        const newOrder=req.body
        const {error,value}=orderValidationSchema.validate(newOrder)
        if(error){
            res.status(500).send({
                success: false,
                message: "Error occured while creating Order(Joi).Some fields are not valid",
                error:error.details
            })
        }else{
            const result = await OrderService.createOrderIntoDB(value)
            res.status(200).send({
                success: true,
                message: "Order created successfully!",
                data:result
            })
        }
        
    } catch (error:unknown) {
        if(error instanceof Error){
            res.status(500).send({
                success: false,
                message: "Technical Error occured while creating Order.",
                error:error.message
            })
        }
        
    }
}

export const OrderController={
    createNewOrder
}