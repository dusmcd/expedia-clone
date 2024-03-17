import express from "express";
export const router = express.Router();
import hotelController from "../controllers/hotels";

router.get("/", hotelController.getHotelsFromSearch);
router.get("/:id", hotelController.getHotelToShow);







