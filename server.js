import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; // <--- ADD THIS

dotenv.config();

mongoose
   .connect(process.env.MONGO_URI)
   .then(() => {
      console.log("Connected to MongoDB");
   })
   .catch((err) => {
      console.log(err);
   });

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(
   cors({
      origin: "http://localhost:8081", // Allow only the React Native frontend to access this server
      methods: ["GET", "POST", "PUT", "DELETE"], // Allow the necessary HTTP methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
   })
);
app.use(express.json());

app.use(cors()); //for search book api

// Routes
import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
   res.send("Hello World");
});

app.listen(PORT, () => {
   console.log("Server is running on port " + PORT);
});
