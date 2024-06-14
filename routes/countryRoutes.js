import express from "express";
import {
  createCountry,
  getCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
} from "../controllers/countryController.js";

const router = express.Router();

router.post("/countries", createCountry);
router.get("/countries", getCountries);
router.get("/countries/:id", getCountryById);
router.put("/countries/:id", updateCountry);
router.delete("/countries/:id", deleteCountry);

export default router;
