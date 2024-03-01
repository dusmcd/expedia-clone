"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
if (process.env.NODE_ENV === "development")
    require("../secrets.js");
const dbUri = process.env.URI;
const clientHost = process.env.NODE_ENV === "development" ?
    "http://localhost:4200" : process.env.CLIENT_HOST;
// common middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({ origin: clientHost })); // this enables requests from client
// landing page
app.get("/", (req, res, next) => {
    throw new Error("Suckas!");
    res.json({ name: "Expedia clone api" });
});
// error handling
app.use((err, req, res, next) => {
    console.error("Error from the API:", err);
    res.sendStatus(500);
});
app.use((req, res) => {
    res.sendStatus(404);
});
const port = process.env.PORT || 8080;
app.listen(port, async () => {
    try {
        // @ts-ignore
        await mongoose_1.default.connect(dbUri);
        console.log("DB Connected");
        console.log(`Server listening on port ${port}`);
    }
    catch (err) {
        console.error("DB Connection error", err);
    }
});
