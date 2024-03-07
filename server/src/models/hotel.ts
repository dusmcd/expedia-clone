import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
    roomNumber: Number,
    rate: Number,
    beds: Number,
    capacity: Number,
    unavailable: [Date]
});

export const RoomModel = mongoose.model("Rooms", roomSchema);

const hotelSchema = new Schema({
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        },
    },
    owner: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    amenities: {
        type: [String],
        enum: ["Wifi", "Breakfast", "Pool", "Room Service"]
    },
    rooms: {
        type: [Schema.Types.ObjectId],
        ref: "Rooms"
    },
    image: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
});

export const HotelModel = mongoose.model("Hotels", hotelSchema);

export interface Hotel {
    address: {
        street: string;
        city: string;
        state: string;
        zipcode: string
    };
    owner: string;
    phoneNumber: string;
    amenities: [string],
    image: string;
    user: string
}

export interface Room {
    roomNumber: number;
    rate: number;
    beds: number;
    capacity: number
}
