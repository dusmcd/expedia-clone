import { Request, Response, NextFunction } from "express";
import { HotelModel } from "../models";

class HotelController {


    async getHotelsFromSearch(req: Request, res: Response, next: NextFunction) {
        try {
            const date = req.query.dates ? new Date(req.query.dates.toString()) : new Date(Date.now());
            const searchParams = { location: req.query.location, guests: Number(req.query.guests), dates: date };
        
            const hotels = await HotelModel.find({ "address.city": searchParams.location }).populate({
                path: "rooms",
                match: { unavailable: { $ne: searchParams.dates }, capacity: { $gte: searchParams.guests }}
            });
        
            const results = hotels
              .filter(hotel => {
                // only want hotels that returned rooms that fit the criteria of the query
                if (hotel.rooms.length) return true
                return false
            });
            res.json(results);
        } catch(err) {
            next(err);
        }
    }

    async getHotelToShow(req: Request, res: Response, next: NextFunction) {
        try {
            const date = req.query.dates && new Date(req.query.dates.toString());
            const searchParams = { guests: Number(req.query.guests), dates: date };
            const hotel = await HotelModel.findById(req.params.id).populate({
                path: "rooms",
                match: { unavailable: { $ne: searchParams.dates }, capacity: { $gte: searchParams.guests }}
            });
            res.json(hotel);
        } catch(err) {
            next(err);
        }
    }
}

export default new HotelController();