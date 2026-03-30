import express, { Application, Request, Response } from "express";
import cors from 'cors';

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
// app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.send("Alhamdulillah....Server is running!");
});


export default app;