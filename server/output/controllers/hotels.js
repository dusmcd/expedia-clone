"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class HotelController {
    MILLISECONDS_DAY = 8.64 * Math.pow(10, 7);
    /*
        purpose: fill in dates in between the from and to dates provided by search
        params: fromDate and toDate from user
        returns: array of dates in chronological order

    */
    handleSearchDates(fromDate, toDate) {
        // i.e., if there are no dates in between fromDate and toDate
        if ((fromDate.valueOf() + this.MILLISECONDS_DAY) === toDate.valueOf())
            return [fromDate, toDate];
        const dateRange = [];
        dateRange.push(fromDate);
        // initializing nextDate as one day after fromDate
        let nextDate = new Date(fromDate.valueOf() + this.MILLISECONDS_DAY);
        while (nextDate.valueOf() !== toDate.valueOf()) {
            dateRange.push(nextDate);
            // increment by one day
            nextDate = new Date(nextDate.valueOf() + this.MILLISECONDS_DAY);
        }
        dateRange.push(toDate);
        return dateRange;
    }
    /*
        purpose: route handler for hotel searching: response with list of hotels that match criteria
        params: request object, response object, and next function for calling the error middleware
        returns: void
    */
    getHotelsFromSearch = async (req, res, next) => {
        try {
            const fromDate = req.query.fromDate ? new Date(req.query.fromDate.toString()) : new Date(Date.now());
            const toDate = req.query.toDate ? new Date(req.query.toDate.toString()) : new Date(Date.now() + this.MILLISECONDS_DAY * 3);
            const dates = this.handleSearchDates(fromDate, toDate);
            const searchParams = { location: req.query.location, guests: Number(req.query.guests), dates };
            const hotels = await models_1.HotelModel.find({ "address.city": searchParams.location }).populate({
                path: "rooms",
                // find rooms where the unavailability does not equal dates searched by user
                match: { unavailable: { $nin: searchParams.dates }, capacity: { $gte: searchParams.guests } }
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
    /*
        purpose: route handler to show single hotel; response with hotel that matches given id
        params: request object, response object, and next function for calling the error middleware
        returns: void
    */
    getHotelToShow = async (req, res, next) => {
        try {
            const date = req.query.dates && new Date(req.query.dates.toString());
            const searchParams = { guests: Number(req.query.guests), dates: date };
            const hotel = await models_1.HotelModel.findById(req.params.id).populate({
                path: "rooms",
                match: { unavailable: { $ne: searchParams.dates }, capacity: { $gte: searchParams.guests } }
            });
            res.json(hotel);
        }
        catch (err) {
            next(err);
        }
    };
}
exports.default = new HotelController();
