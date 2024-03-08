import express from "express";
export const router = express.Router();
import { getHotelsFromSearch } from "../contollers/hotels";

router.get("/", getHotelsFromSearch);







