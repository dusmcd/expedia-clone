"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const models_1 = require("../models");
exports.router.get("/", async (req, res, next) => {
    const date = req.query.dates ? new Date(req.query.dates.toString()) : new Date(Date.now());
    const searchParams = { location: req.query.location, guests: Number(req.query.guests), dates: date };
    const hotels = await models_1.HotelModel.find({ address: { city: searchParams.location } }).populate({
        path: "rooms",
        match: { capacity: searchParams.guests }
    });
    console.log(hotels);
    res.json(hotels);
});
