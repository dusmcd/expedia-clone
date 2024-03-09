import { HotelModel, BookingModel, RoomModel } from "../src/models";
import mongoose, { Schema } from "mongoose";

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

];
const roomTypes = ["King", "Suite", "Queen"];
const descriptions = ["Great location!", "A nice getaway", "A place to relax with friends", "Close to bars", "Beautiful scenery and newly rennovated"];
const neighborhoods = ["Downtown", "Uptown", "Hyde Park", "Broad Acres", "Wicker Park"];

interface Hotel {
    address: {
        street: string;
        city: string;
        state: string;
        zipcode: string
    }
    owner: string;
    amenities?: string[];
    rooms?: Room[]
    phoneNumber: string;
    image?: string;
    description: string;
    neighborhood: string;
}

interface Room {
    roomNumber: number;
    rate: number;
    beds:  number;
    capacity: number;
    unavailable?: Date[];
    roomType: string;
}

interface Booking {
    dates: Date[];
    payment: string;
    numberOfGuests: number;
    user: any;
    hotel?: Hotel;
    room?: Room
}


function makeHotels(numberOfHotels: number) {
    const hotels: Hotel[] = new Array<Hotel>();
    for (let i = 1; i <= numberOfHotels; i++) {
        const hotel: Hotel = {
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
        }
        hotels.push(hotel);
    }
    hotels.map(hotel => {
        const randNumber = Math.round(Math.random() * 3);
        hotel.amenities = [];
        for (let i = 0; i < randNumber + 1; i++) {
            hotel.amenities.push(amenities[i]);
        }
        return hotel;
    })
    return hotels;
}

function makeRooms(numberOfRooms: number) {
    const rooms: Room[] = new Array<Room>();
    for (let i = 1; i <= numberOfRooms; i++) {
        const room: Room = {
            roomNumber: Math.round(Math.random() * 200),
            rate: Math.round(Math.random() * 1000),
            beds: Math.round(Math.random() * 3) + 1,
            capacity: Math.round(Math.random() * 3) + 1,
            roomType: roomTypes[Math.round(Math.random() * 2)]
        }
        rooms.push(room);
    }
    return rooms;
}

function makeBookings(numberOfBookings: number) {
    const bookings: Booking[] = new Array<Booking>();
    for (let i = 1; i <= numberOfBookings; i++) {
        const randMonth = Math.round(Math.random() * 12) + 2
        const randDay = Math.round(Math.random() * 28);
        const day1 = new Date(2024,randMonth,randDay)
        const endDate = new Date(day1.valueOf());
        endDate.setDate(day1.getDate() + 2);
        const booking: Booking = {
            dates: [day1, endDate],
            numberOfGuests: 2,
            payment: "Visa",
            user: new mongoose.Types.ObjectId()
        }
        bookings.push(booking);
    }
    return bookings;
}

async function combine(numberOfRooms: number, numberOfHotels: number, numberOfBookings: number) {
    try {
        require("../secrets");
        await mongoose.connect(process.env.URI as string);
        console.log("DB Connected");
        const rooms = await RoomModel.insertMany(makeRooms(numberOfRooms));
        let i = 0;
        const hotelArr = makeHotels(numberOfHotels).map(hotel => {
            hotel.rooms = new Array<Room>();
            for (let k = 1; k <= 100; k++) {
                // pushing in 100 rooms per hotel (100 hotels and 10,000 rooms)
                hotel.rooms.push(rooms[i]);
                i++;
            }
            return hotel;
        })
        const hotels = await HotelModel.insertMany(hotelArr);

        // associate booking with a hotel and a room
        const unavailableRooms: Promise<any>[] = [];
        const bookingArr = makeBookings(numberOfBookings).map(booking => {
            const randNumber = Math.round(Math.random() * 99);
            booking.hotel = hotels[randNumber];
            // @ts-ignore
            booking.room = hotels[randNumber].rooms[Math.round(Math.random() * 99)];
            unavailableRooms.push(RoomModel.findByIdAndUpdate(booking.room, { unavailable: booking.dates }));
            return booking;
        });
        await Promise.all(unavailableRooms);
        await BookingModel.insertMany(bookingArr);
        console.log("SEED DATA GENERATED");
    } catch(err) {
        await Promise.all([
            mongoose.connection.dropCollection("bookings"),
            mongoose.connection.dropCollection("hotels"),
            mongoose.connection.dropCollection("rooms")
        ])
        console.error(err);
    }
    
}

combine(10000, 100, 5000);