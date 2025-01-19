import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Routes
app.use("/", routes);

export default app;
