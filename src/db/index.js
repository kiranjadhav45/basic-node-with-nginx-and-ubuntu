import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connectionInstance = `${process.env.MONGODB_URL}`
        const connection = mongoose.connect(connectionInstance)
        console.log("connected to the dataBase")
    } catch (error) {
        console.log("faild to connect dataBase", error)
        process.exit(1)
    }

}
export default connectDB