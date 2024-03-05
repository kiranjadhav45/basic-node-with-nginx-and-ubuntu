import { Router } from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct, uploadImage } from "../controller/product.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router()

router.route('/').get(verifyJwt, getAllProducts)
router.route('/create').post(verifyJwt, upload.single('file'), uploadImage, createProduct)
router.route('/update/:id').put(verifyJwt, updateProduct)
router.route('/delete/:id').delete(verifyJwt, deleteProduct)
// router.route('/upload').post(upload.single('file'), uploadImage)

export default router