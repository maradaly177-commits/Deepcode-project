import express from "express";
import cors from "cors";
import propertyRoutes from "./routes/property.routes";
import userRoutes from "./routes/user.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/health", (req, res) => {
    res.json({ success: true, message: "API is running" });
});

// Mount routes
app.use("/api/v1/properties", propertyRoutes);
app.use("/api/v1/users", userRoutes);

// Error handler (đặt cuối cùng)
app.use(errorMiddleware);

export default app;
