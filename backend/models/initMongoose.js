import mongoose from 'mongoose'
import path from 'path'
export const connectMongoDb = async () => {
    if (process.env.NODE_ENV !== 'production')
        await mongoose.connect(process.env.MONGO_URI_DEV)
    else await mongoose.connect(process.env.MONGO_URI)
}
