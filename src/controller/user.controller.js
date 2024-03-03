import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

const registerUser = asyncHandler(async (req, resp) => {

    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return resp.json({
                status: 400,
                message: "please provide all fields"
            })
        }

        const isUser = await User.findOne({ email: email })

        if (isUser) {
            return resp.json({
                status: 400,
                statusCode: 400,
                message: "user alredy exist"
            })
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const create = await User.create({ name, email, password: hashedPassword, refreshToken: null })

        const createdUser = await User.findById(create._id).select(
            "-password -refreshToken"
        )
        const plainUserObject = createdUser.toObject();

        const refreshToken = await jwt.sign(plainUserObject, process.env.REFRESH_TOKEN_KEY, { expiresIn: process.env.REFRES_TOKEN_EXPIRE_TIME });

        const result = await User.updateOne({ _id: create._id }, { $set: { refreshToken: refreshToken } })

        return resp.json({
            status: 201,
            statusCode: 201,
            data: createdUser,
            message: "user created"
        })
    } catch (error) {
        return resp.json({
            status: 400,
            statusCode: 400,
            message: error.message || "internal server error when creating user"
        })
    }
})

const loginUser = asyncHandler(async (req, resp) => {

    try {
        const { email, password } = req.body

        const isUserExist = await User.findOne({ email }).select('+password')

        if (!isUserExist) {
            return resp.json({
                status: 404,
                statusCode: 404,
                message: "user not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, isUserExist.password);
        if (!isPasswordValid) {
            return resp.json({
                status: 400,
                statusCode: 400,
                message: "invalid password"
            })
        }

        const newUser = await User.findById(isUserExist._id).select(
            "-password"
        )

        return resp.json({
            status: 200,
            statusCode: 200,
            message: "Login successfully",
            data: newUser,
        })
    } catch (error) {
        return resp.json({
            status: 400,
            statusCode: 400,
            message: error.message || "internal server error when login",
        })
    }
})

export { registerUser, loginUser }


