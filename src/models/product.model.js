import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: { type: String, require: true },
    price: { type: String, require: true },
    description: { type: String, require: true },
}, { timestamps: true })

export const Product = mongoose.model('Product', productSchema) 