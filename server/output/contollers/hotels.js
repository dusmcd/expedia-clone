"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelsFromSearch = void 0;
const models_1 = require("../models");
const getHotelsFromSearch = async (req, res, next) => {
    try {
        const date = req.query.dates ? new Date(req.query.dates.toString()) : new Date(Date.now());
        const searchParams = { location: req.query.location, guests: Number(req.query.guests), dates: date };
        const hotels = await models_1.HotelModel.find({ "address.city": searchParams.location }).populate({
            path: "rooms",
            match: { unavailable: { $ne: searchParams.dates }, capacity: { $gte: searchParams.guests } }
        });
        const results = hotels
            .filter(hotel => {
            // only want hotels that returned rooms that fit the criteria of the query
            if (hotel.rooms.length)
                return true;
            return false;
        });
        res.json(results);
    }
    catch (err) {
        next(err);
    }
};
exports.getHotelsFromSearch = getHotelsFromSearch;
