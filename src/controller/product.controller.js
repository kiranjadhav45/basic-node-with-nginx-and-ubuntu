import { Product } from "../models/product.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const uploadImage = async (req, resp) => {

    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        return resp.json({
            status: 400,
            message: "Avatar file is missing"
        })

    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    return resp.json({
        status: 200,
        data: avatar
    })
}

const getAllProducts = asyncHandler(async (req, resp) => {
    try {
        const page = req.query.page || 1
        const pageSize = req.query.pageSize || 10
        const totalCount = await Product.countDocuments();
        const data = await Product.find().skip((page - 1) * pageSize).limit(pageSize)
        return resp
            .status(200)
            .json({
                status: true,
                statusCode: 200,
                product: data,
                totalCount,
                page,
                pageSize
            })
    } catch (error) {
        return resp
            .status(400)
            .json({
                status: false,
                statusCode: 400,
                message: "error",
            })
    }
})
const createProduct = asyncHandler(async (req, resp) => {
    try {

        const { name, price, description } = req.body;
        const user = req.user

        if (!user) {
            return resp
                .status(400)
                .json({
                    status: false,
                    statusCode: 404,
                    message: "user not found"
                })
        }
        const createProduct = await Product.create({ name, price, description, createdBy: user._id })
        console.log(createProduct)
        return resp
            .status(200)
            .json({
                status: true,
                statusCode: 201,
                product: createProduct,
            })
    } catch (error) {
        return resp
            .status(400)
            .json({
                status: false,
                statusCode: 404,
                message: error
            })
    }
})
const updateProduct = asyncHandler(async (req, resp) => {
    try {
        const { id } = req?.params
        const { name, price, description } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description }, { new: true })
        if (!updatedProduct) {
            return resp
                .status(404)
                .json({
                    status: false,
                    statusCode: 404,
                    message: 'product not updated'
                })
        }
        return resp
            .status(200)
            .json({
                status: true,
                statusCode: 200,
                data: updatedProduct
            })
    } catch (error) {
        return resp
            .status(200)
            .json({
                status: false,
                statusCode: 404,
                message: error
            })
    }
})
const deleteProduct = asyncHandler(async (req, resp) => {
    try {
        const { id } = req.params
        const deleteProduct = await Product.findByIdAndDelete(id)

        if (!deleteProduct) {
            return resp
                .status(404)
                .json({
                    status: false,
                    statusCode: 404,
                    message: 'product not deleted'
                })
        }
        return resp
            .status(200)
            .json({
                status: true,
                statusCode: 200,
                message: deleteProduct,
                message: 'product deleted'
            })

    } catch (error) {

        return resp
            .status(404)
            .json({
                status: false,
                statusCode: 404,
                message: error
            })

    }
})

export { getAllProducts, createProduct, updateProduct, deleteProduct, uploadImage }