import express, { Application, Request, Response } from "express";
import cors from 'cors';
import { IndexRouter } from "./app/routes";

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1", IndexRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Alhamdulillah....Server is running!");
});

export default app;