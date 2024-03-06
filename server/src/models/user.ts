import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    type: {
        enum: ["Guest", "Member", "Entity"],
    },
    bookings: {
        type: [Schema.Types.ObjectId],
        ref: "Bookings"
    }
});

export const UserModel = mongoose.model("Users", userSchema);

export interface User {
    name: string;
    email: string;
    phoneNumber: string;
    type: string;
    bookings?: [string]
}