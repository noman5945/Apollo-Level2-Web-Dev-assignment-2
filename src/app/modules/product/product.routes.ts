import express from 'express'
import { ProductControllers } from './product.controller'

const routes=express.Router()

routes.post('/create-product',ProductControllers.createNewProduct)

routes.get('/',ProductControllers.getAllProducts)

routes.get('/:productId',ProductControllers.getProductByID)

routes.put('/:productId',ProductControllers.upsertProductByID)

routes.delete('/:productId',ProductControllers.deleteProductByID)

routes.get('/search/',ProductControllers.searchProductByKeyword)

export const ProductRoutes=routes