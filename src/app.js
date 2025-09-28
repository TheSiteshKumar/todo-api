import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import categgoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categgoryRoutes)

app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

export default app;
