import cors from "cors";
import express, { urlencoded } from "express";

const app = express();

app.use(cors());
app.use(express.json());

app.use(urlencoded({ extended: true }));

export default app;
