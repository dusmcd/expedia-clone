import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    dates: {
        type: Array<Date>,
        required: true
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: "Rooms",
        required: true
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
});

export const BookingModel = mongoose.model("Bookings", bookingSchema);

export interface Booking {
    dates: [Date];
    room: string;
    hotel: string;
    numberOfGuests: number;
    payment: string,
    user: string
}