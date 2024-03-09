import express from "express";
import cors from "cors";
import statusMonitor from 'express-status-monitor';
const app = express()

app.use(statusMonitor());

app.use(cors());
app.use(express.json({ limit: "16kb" }))

// product routes
import productRouter from './routes/product.routes.js'
import userRouter from './routes/user.routes.js'
app.use('/api/v1/products', productRouter)
app.use('/api/v1/user', userRouter)

export { app }