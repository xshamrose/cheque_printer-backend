import express from "express";
import {
  createEmailTemplate,
  getEmailTemplates,
  getEmailTemplateById,
  updateEmailTemplate,
  deleteEmailTemplate,
} from "../controllers/emailTemplateController.js";

const router = express.Router();

router.post("/email-templates", createEmailTemplate);
router.get("/email-templates", getEmailTemplates);
router.get("/email-templates/:id", getEmailTemplateById);
router.put("/email-templates/:id", updateEmailTemplate);
router.delete("/email-templates/:id", deleteEmailTemplate);

export default router;
