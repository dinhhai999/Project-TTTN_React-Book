import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MongoDB URI is not defined in the .env file");
        }

        const connect = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected: ${connect.connection.port} 🎉`);
    } catch (error) {
        console.log(`MongoDB connect error: ${error.message} ❌`);
    }
};

export default connectDB;
