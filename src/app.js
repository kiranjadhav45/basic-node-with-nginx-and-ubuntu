import express from "express";
import cors from "cors";

const app = express()


app.use(cors());
app.use(express.json({ limit: "16kb" }))

// product routes
import productRouter from './routes/product.routes.js'
import userRouter from './routes/user.routes.js'
app.use('/api/v1/products', productRouter)
app.use('/api/v1/user', userRouter)

export { app }