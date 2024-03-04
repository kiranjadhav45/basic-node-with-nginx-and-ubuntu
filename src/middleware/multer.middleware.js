import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/temp')
    },
    filename: (req, file, cb) => {
        // cb(null, file.originalname)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname)

    }
})

export const upload = multer({
    storage,
})