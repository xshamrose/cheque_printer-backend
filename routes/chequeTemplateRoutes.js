import express from "express";
import {
  createChequeTemplate,
  getChequeTemplates,
  getChequeTemplateById,
  updateChequeTemplate,
  deleteChequeTemplate,
} from "../controllers/chequeTemplateController.js";

const router = express.Router();

router.post("/cheque-template", createChequeTemplate);
router.get("/cheque-template", getChequeTemplates);
router.get("/cheque-template/:id", getChequeTemplateById);
router.put("/cheque-template/:id", updateChequeTemplate);
router.delete("/cheque-template/:id", deleteChequeTemplate);

export default router;
