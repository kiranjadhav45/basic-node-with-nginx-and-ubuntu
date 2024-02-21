import { Router } from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../controller/product.controller.js";
const router = Router()

router.route('/').get(getAllProducts)
router.route('/create').post(createProduct)
router.route('/update/:id').put(updateProduct)
router.route('/delete/:id').delete(deleteProduct)


export default router