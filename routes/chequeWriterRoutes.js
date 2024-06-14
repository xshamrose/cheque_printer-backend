import express from "express";
import {
  createChequeWriter,
  getChequeWriters,
  getChequeWriterById,
  updateChequeWriter,
  deleteChequeWriter,
} from "../controllers/chequeWriterController.js";

const router = express.Router();

router.post("/cheque-writer", createChequeWriter);
router.get("/cheque-writer", getChequeWriters);
router.get("/cheque-writer/:id", getChequeWriterById);
router.put("/cheque-writer/:id", updateChequeWriter);
router.delete("/cheque-writer/:id", deleteChequeWriter);

export default router;
