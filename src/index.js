import { app } from "./app.js";
import connectDB from "./db/index.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("mongoDB connection faild !!!", err)
    })
