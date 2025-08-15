import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


export default app;
