import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/error";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
