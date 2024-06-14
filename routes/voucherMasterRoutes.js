import express from "express";
import {
  createVoucherMaster,
  getVoucherMasters,
  getVoucherMasterById,
  updateVoucherMaster,
  deleteVoucherMaster,
} from "../controllers/voucherMasterController.js";

const router = express.Router();

router.post("/vouchers", createVoucherMaster);
router.get("/vouchers", getVoucherMasters);
router.get("/vouchers/:id", getVoucherMasterById);
router.put("/vouchers/:id", updateVoucherMaster);
router.delete("/vouchers/:id", deleteVoucherMaster);

export default router;
