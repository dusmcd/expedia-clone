import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    hotel: {
        type: Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    text: String
});

export const ReviewModel = mongoose.model("Reviews", reviewSchema);

export interface Review {
    hotel: string;
    user: string;
    points: number;
    text: string
}