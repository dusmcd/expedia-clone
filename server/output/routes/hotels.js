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
    console.dir(date);
    const searchParams = { location: req.query.location, guests: Number(req.query.guests), dates: date };
    const bookings = await models_1.BookingModel.find({}).where("dates").ne(searchParams.dates.valueOf()).populate({
        path: "hotel",
        match: { address: { city: searchParams.location } },
        populate: {
            path: "rooms",
            match: { capacity: Number(searchParams.guests) }
        }
    });
    res.json(bookings.map(booking => booking.hotel));
});
