import { HotelModel, BookingModel, RoomModel } from "../src/models";
import mongoose, { Schema, mongo } from "mongoose";

const owners = ["Hilton", "Marriott", "Windham", "Hyatt", "Embassy Suites"];
const streets = ["123 Main St", "21721 Johnstone Dr.", "3214 Chestnut St.", "128 Golden Pond Dr.", "2646 Windsor Ave."];
const cities = ["Las Vegas", "Lake Forest", "Columbia", "Charleston", "Raleigh", "Charlotte", "San Diego", "Los Angeles", "New York", "Chicago", "San Francisco", "Kansas City"];
const states = ["NV", "CA", "SC", "NC", "NY", "IL", "MO"];
const zipcodes = ["91451", "92630", "29073", "84321", "64598"];
const amenities = ["Wifi", "Breakfast", "Pool", "Room Service"];
const images = [
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/705773/pexels-photo-705773.jpeg?auto=compress&cs=tinysrgb&w=600"

]


function makeHotels() {
    const hotels = [];
    for (let i = 1; i <= 100; i++) {
        const randNumber = Math.round(Math.random() * 4)
        const hotel = {
            address: {
                street: streets[randNumber],
                city: cities[randNumber],
                state: states[randNumber],
                zipcode: zipcodes[randNumber]
            },
            owner: owners[randNumber],
            phoneNumber: "714-867-5309",
            image: images[randNumber]
        }
        // @ts-ignore
        hotels.push(hotel);
    }
    hotels.map(hotel => {
        const randNumber = Math.round(Math.random() * 3);
        // @ts-ignore
        hotel.amenities = [];
        for (let i = 0; i < randNumber + 1; i++) {
            // @ts-ignore
            hotel.amenities.push(amenities[i]);
        }
        return hotel;
    })
    return hotels;
}

function makeRooms() {
    const rooms = [];
    for (let i = 1; i <= 10_000; i++) {
        const room = {
            roomNumber: Math.round(Math.random() * 200),
            rate: Math.round(Math.random() * 1000),
            beds: Math.round(Math.random() * 3) + 1,
            capacity: Math.round(Math.random() * 3) + 1
        }
        // @ts-ignore
        rooms.push(room);
    }
    return rooms;
}

function makeBookings() {
    const bookings = [];
    for (let i = 1; i <= 5000; i++) {
        const randMonth = Math.round(Math.random() * 12) + 2
        const randDay = Math.round(Math.random() * 28);
        const day1 = new Date(2024,randMonth,randDay)
        const endDate = new Date(day1.valueOf());
        endDate.setDate(day1.getDate() + 2);
        const booking = {
            dates: [day1, endDate],
            numberOfGuests: 2,
            payment: "Visa",
            user: new mongoose.Types.ObjectId()
        }
        // @ts-ignore
        bookings.push(booking);
    }
    return bookings;
}

async function combine() {
    try {
        require("../secrets");
        await mongoose.connect(process.env.URI as string);
        console.log("DB Connected");
        const rooms = await RoomModel.insertMany(makeRooms());
        let i = 0;
        const hotelArr = makeHotels().map(hotel => {
            // @ts-ignore
            hotel.rooms = [];
            for (let k = 1; k <= 100; k++) {
                // @ts-ignore
                // pushing in 100 rooms per hotel (100 hotels and 10,000 rooms)
                hotel.rooms.push(rooms[i]);
                i++;
            }
            return hotel;
        })
        const hotels = await HotelModel.insertMany(hotelArr);

        // associate booking with a hotel and a room
        const bookingArr = makeBookings().map(booking => {
            const randNumber = Math.round(Math.random() * 99);
            //@ts-ignore
            booking.hotel = hotels[randNumber];
            // @ts-ignore
            booking.room = hotels[randNumber].rooms[Math.round(Math.random() * 99)];
            return booking;
        });
        for (let j = 0; j < bookingArr.length; j++) {
            //@ts-ignore
            await RoomModel.findByIdAndUpdate(bookingArr[j].room, { unavailable: [...bookingArr[j].dates] })
        }
        await BookingModel.insertMany(bookingArr);
        console.log("SEED DATA GENERATED");
    } catch(err) {
        console.error(err);
    }
    
}

combine();