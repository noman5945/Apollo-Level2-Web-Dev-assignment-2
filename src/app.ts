import cors from 'cors'
import express, { Request, Response } from 'express'
import { ProductRoutes } from './app/modules/product/product.routes'
const app=express()

app.use(cors())
app.use(express.json())

//API ROUTES
app.use('/api/products',ProductRoutes)

//APP SHOW RUNNING
app.get('/',(req:Request,res:Response)=>{
    console.log("Ecommerce site backend Running")
})

export default app