import express from 'express'
import { OrderController } from './order.controller'
const orderRouter=express.Router()

orderRouter.post('/',OrderController.createNewOrder)

orderRouter.get('/',OrderController.getOrders)

export const OrderRouters=orderRouter