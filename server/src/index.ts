import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

if (process.env.NODE_ENV === "development") require("../secrets.js");
const dbUri = process.env.URI;
const clientHost = process.env.NODE_ENV === "development" ? 
    "http://localhost:4200" : process.env.CLIENT_HOST;

// common middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: clientHost })); // this enables requests from client

// landing page
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({ name: "Expedia clone api" });
})

const port = process.env.PORT || 8080;
app.listen(port, async () => {
    try {
        // @ts-ignore
        await mongoose.connect(dbUri);
        console.log("DB Connected");
        console.log(`Server listening on port ${port}`);
    } catch(err) {
        console.error("DB Connection error", err);
    }
})