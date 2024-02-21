import express from "express";

const app = express()

app.use(express.json({ limit: "16kb" }))

// product routes
import productRouter from './routes/product.routes.js'
app.use('/api/v1/products', productRouter)

export { app }