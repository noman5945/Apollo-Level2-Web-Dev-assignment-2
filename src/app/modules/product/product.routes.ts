import express from 'express'
import { ProductControllers } from './product.controller'

const routes=express.Router()

routes.post('/create-product',ProductControllers.createNewProduct)

export const ProductRoutes=routes