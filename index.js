import express from "express";
import { connectToDatabase } from "./config/database.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

connectToDatabase();

app.use("/api/auth", authRoutes);

// ✅ Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy and running 🚀",
  });
});

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
