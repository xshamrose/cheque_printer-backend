import express from "express";
import {
  createCustomerMaster,
  getCustomerMasters,
  getCustomerMasterById,
  updateCustomerMaster,
  deleteCustomerMaster,
} from "../controllers/customerMasterController.js";

const router = express.Router();

router.post("/customers", createCustomerMaster);
router.get("/customers", getCustomerMasters);
router.get("/customers/:id", getCustomerMasterById);
router.put("/customers/:id", updateCustomerMaster);
router.delete("/customers/:id", deleteCustomerMaster);

export default router;
