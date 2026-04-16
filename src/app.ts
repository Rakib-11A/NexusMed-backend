import express, { Application, Request, Response } from "express";
import cors from 'cors';
import { IndexRouter } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1", IndexRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Alhamdulillah....Server is running!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;