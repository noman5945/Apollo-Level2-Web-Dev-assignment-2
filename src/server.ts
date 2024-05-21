import mongoose from 'mongoose'
import config from './app/config'
import app from './app'

const port=config.port
const db_connection=config.db_connection_string

async function main() {
    try {
        await mongoose.connect(db_connection as string)
        app.listen(port,()=>{
            console.log(`Ecommerce app running on ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()