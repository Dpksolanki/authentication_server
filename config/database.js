import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        // Establish a connection to the database using the URI from environment variables
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connection.connection.host}`); // Log successful connection
    } catch (error) {
        // Log connection errors
        throw new Error(`Error connecting to MongoDB: ${error.message}`);
    }
};
