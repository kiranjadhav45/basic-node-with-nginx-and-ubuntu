import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: [true, 'email alredy exist'] },
    password: { type: String, require: true, select: true },
    refreshToken: { type: String },
}, { timestamps: true })

export const User = mongoose.model('User', userSchema)