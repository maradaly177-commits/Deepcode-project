import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!, { dbName: "deepcode" });
        console.log("✅ MongoDB connected successfully");
        process.exit(0);
    } catch (err) {
        console.error("❌ MongoDB connection failed", err);
        process.exit(1);
    }
})();
