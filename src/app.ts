import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", routes);

export default app;
