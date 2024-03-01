import express, { Request, Response, NextFunction } from "express";
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

if (process.env.NODE_ENV === "development") require("../secrets.js");
const dbUri: string | undefined = process.env.DBURI;
const clientHost: string | undefined = process.env.NODE_ENV === "development" ? 
    "http://localhost:4200" : process.env.CLIENT_HOST;

// common middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: clientHost }));

// landing page
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({ name: "Expedia clone api" });
})


app.listen(8080, async () => {
    console.log("Server listening on port 8080");
})