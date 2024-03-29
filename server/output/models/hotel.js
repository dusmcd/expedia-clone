"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelModel = exports.RoomModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const roomSchema = new mongoose_1.Schema({
    roomNumber: Number,
    rate: Number,
    beds: Number,
    capacity: Number,
    unavailable: [Number],
    roomType: {
        enum: ["King", "Queen", "Suite"],
        type: String
    }
}, {
    virtuals: {
        unavailableDates: {
            get() {
                return this.unavailable.map((dateValue) => new Date(dateValue));
            }
        }
    },
    toJSON: { virtuals: true }
});
exports.RoomModel = mongoose_1.default.model("Rooms", roomSchema);
const hotelVirtuals = {
    price: {
        get() {
            // @ts-ignore
            return this.rooms.map(room => room.rate).sort((a, b) => a - b)[0];
        }
    },
};
const hotelSchema = new mongoose_1.Schema({
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
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Rooms"
    },
    image: String,
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users"
    },
    description: String,
    neighborhood: String,
}, { virtuals: hotelVirtuals, toJSON: { virtuals: true } });
exports.HotelModel = mongoose_1.default.model("Hotels", hotelSchema);
