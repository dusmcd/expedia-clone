import express from "express";
export const router = express.Router();
import { asyncCatcher } from "../utils";

import hotelController from "../controllers/hotels";

router.get("/", asyncCatcher(hotelController.getHotelsFromSearch));
router.get("/:id", asyncCatcher(hotelController.getHotelToShow));







