"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const hotels_1 = __importDefault(require("../controllers/hotels"));
exports.router.get("/", hotels_1.default.getHotelsFromSearch);
exports.router.get("/:id", hotels_1.default.getHotelToShow);
