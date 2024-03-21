"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const utils_1 = require("../utils");
const hotels_1 = __importDefault(require("../controllers/hotels"));
exports.router.get("/", (0, utils_1.asyncCatcher)(hotels_1.default.getHotelsFromSearch));
exports.router.get("/:id", (0, utils_1.asyncCatcher)(hotels_1.default.getHotelToShow));
