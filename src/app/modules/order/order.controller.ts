import { Request, Response } from "express";
import { OrderService } from "./order.service";
import orderValidationSchema from "./order.validator";

/**
 * Method to create New order and substract quantity of the product from stock
 * @param req A request body with order data
 * @param res 
 */
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

/**
 * Get all orders from database.If an email is passed as query then all orders of that email will be fetched.Otherwise fetch entire data
 * @param req 
 * @param res 
 */
const getOrders=async(req:Request,res:Response)=>{
    try {
        if(typeof req.query.email!=='undefined'){
            const keyEmail=req.query.email
            const orders=await OrderService.getOrderByEmailfromDB(keyEmail as string)
            res.status(200).send({
                success: true,
                message: "Order data fetched for email successfully!",
                data:orders
            })
        }else{
            const orders=await OrderService.getAllOrdersfromDB()
            res.status(200).send({
                success: true,
                message: "Order data fetched successfully!",
                data:orders
            })
        }
    } catch (error:unknown) {
        if(error instanceof Error){
            res.status(500).send({
                success: false,
                message: "Technical Error occured while fetching Order.",
                error:error.message
            })
        }
    }
}

export const OrderController={
    createNewOrder,
    getOrders
}