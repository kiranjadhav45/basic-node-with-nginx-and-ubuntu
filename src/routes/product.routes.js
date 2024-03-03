import { Router } from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../controller/product.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router()

router.route('/').get(verifyJwt, getAllProducts)
router.route('/create').post(verifyJwt, createProduct)
router.route('/update/:id').put(verifyJwt, updateProduct)
router.route('/delete/:id').delete(verifyJwt, deleteProduct)

export default router