"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../src/models");
var mongoose_1 = require("mongoose");
var owners = ["Hilton", "Marriott", "Windham", "Hyatt", "Embassy Suites"];
var streets = ["123 Main St", "21721 Johnstone Dr.", "3214 Chestnut St.", "128 Golden Pond Dr.", "2646 Windsor Ave."];
var cities = ["Las Vegas", "Lake Forest", "Columbia", "Charleston", "Raleigh", "Charlotte", "San Diego", "Los Angeles", "New York", "Chicago", "San Francisco", "Kansas City"];
var states = ["NV", "CA", "SC", "NC", "NY", "IL", "MO"];
var zipcodes = ["91451", "92630", "29073", "84321", "64598"];
var amenities = ["Wifi", "Breakfast", "Pool", "Room Service"];
var images = [
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=600"
];
var roomTypes = ["King", "Suite", "Queen"];
var descriptions = ["Great location!", "A nice getaway", "A place to relax with friends", "Close to bars", "Beautiful scenery and newly rennovated"];
var neighborhoods = ["Downtown", "Uptown", "Hyde Park", "Broad Acres", "Wicker Park"];
function makeHotels(numberOfHotels) {
    var hotels = new Array();
    for (var i = 1; i <= numberOfHotels; i++) {
        var hotel = {
            address: {
                street: streets[Math.round(Math.random() * 4)],
                city: cities[Math.round(Math.random() * 11)],
                state: states[Math.round(Math.random() * 6)],
                zipcode: zipcodes[Math.round(Math.random() * 4)]
            },
            owner: owners[Math.round(Math.random() * 4)],
            phoneNumber: "714-867-5309",
            image: images[Math.round(Math.random() * 4)],
            description: descriptions[Math.round(Math.random() * 4)],
            neighborhood: neighborhoods[Math.round(Math.random() * 4)]
        };
        hotels.push(hotel);
    }
    hotels.map(function (hotel) {
        var randNumber = Math.round(Math.random() * 3);
        hotel.amenities = [];
        for (var i = 0; i < randNumber + 1; i++) {
            hotel.amenities.push(amenities[i]);
        }
        return hotel;
    });
    return hotels;
}
function makeRooms(numberOfRooms) {
    var rooms = new Array();
    for (var i = 1; i <= numberOfRooms; i++) {
        var room = {
            roomNumber: Math.round(Math.random() * 200),
            rate: Math.round(Math.random() * 1000),
            beds: Math.round(Math.random() * 3) + 1,
            capacity: Math.round(Math.random() * 3) + 1,
            roomType: roomTypes[Math.round(Math.random() * 2)]
        };
        rooms.push(room);
    }
    return rooms;
}
function makeBookings(numberOfBookings) {
    var bookings = new Array();
    for (var i = 1; i <= numberOfBookings; i++) {
        var randMonth = Math.round(Math.random() * 12) + 2;
        var randDay = Math.round(Math.random() * 28);
        var day1 = new Date(2024, randMonth, randDay);
        var endDate = new Date(day1.valueOf());
        endDate.setDate(day1.getDate() + 2);
        var booking = {
            dates: [day1, endDate],
            numberOfGuests: 2,
            payment: "Visa",
            user: new mongoose_1.default.Types.ObjectId()
        };
        bookings.push(booking);
    }
    return bookings;
}
function combine(numberOfRooms, numberOfHotels, numberOfBookings) {
    return __awaiter(this, void 0, void 0, function () {
        var rooms_1, i_1, hotelArr, hotels_1, unavailableRooms_1, bookingArr, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 8]);
                    require("../secrets");
                    return [4 /*yield*/, mongoose_1.default.connect(process.env.URI)];
                case 1:
                    _a.sent();
                    console.log("DB Connected");
                    return [4 /*yield*/, models_1.RoomModel.insertMany(makeRooms(numberOfRooms))];
                case 2:
                    rooms_1 = _a.sent();
                    i_1 = 0;
                    hotelArr = makeHotels(numberOfHotels).map(function (hotel) {
                        hotel.rooms = new Array();
                        for (var k = 1; k <= (numberOfRooms / numberOfHotels); k++) {
                            // pushing in 100 rooms per hotel (100 hotels and 10,000 rooms)
                            hotel.rooms.push(rooms_1[i_1]);
                            i_1++;
                        }
                        return hotel;
                    });
                    return [4 /*yield*/, models_1.HotelModel.insertMany(hotelArr)];
                case 3:
                    hotels_1 = _a.sent();
                    unavailableRooms_1 = [];
                    bookingArr = makeBookings(numberOfBookings).map(function (booking) {
                        var randNumber = Math.round(Math.random() * 99);
                        booking.hotel = hotels_1[randNumber];
                        // @ts-ignore
                        booking.room = hotels_1[randNumber].rooms[Math.round(Math.random() * 99)];
                        unavailableRooms_1.push(models_1.RoomModel.findByIdAndUpdate(booking.room, { unavailable: booking.dates }));
                        return booking;
                    });
                    return [4 /*yield*/, Promise.all(unavailableRooms_1)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, models_1.BookingModel.insertMany(bookingArr)];
                case 5:
                    _a.sent();
                    console.log("SEED DATA GENERATED");
                    return [3 /*break*/, 8];
                case 6:
                    err_1 = _a.sent();
                    return [4 /*yield*/, Promise.all([
                            mongoose_1.default.connection.dropCollection("bookings"),
                            mongoose_1.default.connection.dropCollection("hotels"),
                            mongoose_1.default.connection.dropCollection("rooms")
                        ])];
                case 7:
                    _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
combine(10000, 100, 5000);
