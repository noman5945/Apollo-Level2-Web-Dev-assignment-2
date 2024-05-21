import cors from 'cors'
import express, { Request, Response } from 'express'
import { ProductRoutes } from './app/modules/product/product.routes'
import { OrderRouters } from './app/modules/order/order.routes'
const app=express()

app.use(cors())
app.use(express.json())

//API ROUTES
app.use('/api/products',ProductRoutes)
app.use('/api/orders',OrderRouters)

//APP SHOW RUNNING
app.get('/',(req:Request,res:Response)=>{
    console.log("Ecommerce site backend Running")
})

export default app