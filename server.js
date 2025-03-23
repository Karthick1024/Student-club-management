import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";
import studentRoutes from "./routes/student.Routes.js";
import authRoutes from "./routes/auth.Routes.js";
import errorMiddleware from "./middleware/errorHandleware.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
const __dirname = dirname(fileURLToPath(import.meta.url));
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Erode Arts & Science College",
      version: "1.0.0",
      description:
        "API Documentation for managing student info department-wise",
    },
    servers: [
      { url: "http://localhost:5100" },
      { url: "https://qp852v4n-5100.inc1.devtunnels.ms/" },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}`);
  console.log("Request Body:", req.body);

  res.on("finish", () => {
    console.log(`Response Status: ${res.statusCode}`);
  });

  next();
});
app.use(express.static(path.join(__dirname, "./public")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/students", studentRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the Student Club Management API 🚀");
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});



app.use(errorMiddleware);

app.get("/api", (req, res) => {
  res.send("Hi, Facebook-like API");
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Page not found" });
});
const port = process.env.PORT || 5100;

(async () => {
  try {
    if (!process.env.MONGO_URL)
      throw new Error("MONGO_URL environment variable is missing");

    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
})();
