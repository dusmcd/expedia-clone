import express, { Request, Response, NextFunction } from "express";
export const router = express.Router();
import { BookingModel, HotelModel } from "../models";

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const date = req.query.dates ? new Date(req.query.dates.toString()) : new Date(Date.now());
    const searchParams = { location: req.query.location, guests: Number(req.query.guests), dates: date };

    const hotels = await HotelModel.find({ "address.city": searchParams.location }).populate({
        path: "rooms",
        match: { unavailable: { $ne: searchParams.dates }, capacity: { $gte: searchParams.guests }}
    });

    const results = hotels.filter(hotel => {
        if (hotel.rooms.length) return true
        return false
    })
    res.json(results);
    
});







