import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { hotelRouter } from "./routes";
const app = express();

if (process.env.NODE_ENV === "development") require("../secrets.js");
const dbUri: string = process.env.URI as string;
const clientHost: string = process.env.NODE_ENV === "development" ? 
    "http://localhost:4200" : process.env.CLIENT_HOST as string;

// common middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: clientHost })); // this enables requests from client

// api routes
app.use("/api/hotels", hotelRouter);

// landing page
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({ name: "Expedia clone api" });
});

// error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error from the API:", err);
    res.sendStatus(500);
});

app.use((req: Request, res: Response) => {
    res.sendStatus(404);
});

const port = process.env.PORT || 8080;
app.listen(port, async () => {
    try {
        await mongoose.connect(dbUri);
        console.log("DB Connected");
        console.log(`Server listening on port ${port}`);
    } catch(err) {
        console.error("DB Connection error", err);
    }
})