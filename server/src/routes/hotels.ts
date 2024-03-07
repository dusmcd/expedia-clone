import express, { Request, Response, NextFunction } from "express";
export const router = express.Router();
import { BookingModel } from "../models";

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const date = req.query.dates ? new Date(req.query.dates.toString()) : new Date(Date.now());
    console.dir(date);
    const searchParams = { location: req.query.location, guests: Number(req.query.guests), dates: date };

    const bookings = await BookingModel.find({}).where("dates").ne(searchParams.dates.valueOf()).populate({
        path: "hotel",
        match: { address: { city: searchParams.location }},
        populate: {
            path: "rooms",
            match: { capacity: Number(searchParams.guests) }
        }
    });
    res.json(bookings.map(booking => booking.hotel));
});







