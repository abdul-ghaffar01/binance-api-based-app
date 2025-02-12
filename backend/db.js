import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Exit the process on failure
    }
};

export default connectToDatabase;
