import cors from 'cors'
import express, { Request, Response } from 'express'
const app=express()

app.use(cors())
app.use(express.json())

//API ROUTES

//APP SHOW RUNNING
app.get('/',(req:Request,res:Response)=>{
    console.log("Ecommerce site backend Running")
})

export default app