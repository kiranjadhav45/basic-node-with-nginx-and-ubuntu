import Jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJwt = async (req, resp, next) => {
    try {
        const token = req?.headers['authorization'];
        if (!token) {
            return resp.json({
                status: 400,
                data: null,
                statusCode: 404,
                message: "undefine accessToken"
            })
        }
        const verifyJwt = Jwt.verify(token, process.env.REFRESH_TOKEN_KEY)

        if (!verifyJwt) {
            return resp.json({
                status: 400,
                message: "uanble to verify accessToken"
            })
        }

        const user = await User.findById(verifyJwt._id).select('-password -refreshToken')
        req.user = user
        next()
    } catch (error) {
        return resp.json({
            status: 400,
            message: error?.message || "internal server error when verify jwt token"
        })
    }
}
export { verifyJwt }