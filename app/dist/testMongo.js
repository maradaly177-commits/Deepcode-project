"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI, { dbName: "deepcode" });
        console.log("✅ MongoDB connected successfully");
        process.exit(0);
    }
    catch (err) {
        console.error("❌ MongoDB connection failed", err);
        process.exit(1);
    }
})();
//# sourceMappingURL=testMongo.js.map