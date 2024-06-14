import express from "express";
import {
  createBankMaster,
  getBankMasters,
  getBankMasterById,
  updateBankMaster,
  deleteBankMaster,
} from "../controllers/bankMasterController.js";

const router = express.Router();

router.post("/bank-master", createBankMaster);
router.get("/bank-master", getBankMasters);
router.get("/bank-master/:id", getBankMasterById);
router.put("/bank-master/:id", updateBankMaster);
router.delete("/bank-master/:id", deleteBankMaster);

export default router;
