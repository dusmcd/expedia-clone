import express from "express";
export const router = express.Router();
import { getHotelsFromSearch } from "../contollers/hotels";
import { asyncCatcher } from "../utils";

router.get("/", asyncCatcher(getHotelsFromSearch));







