import express from "express";
import {
  createUserRole,
  getUserRoles,
  getUserRoleById,
  updateUserRole,
  deleteUserRole,
} from "../controllers/userRoleController.js";

const router = express.Router();

router.post("/user-roles", createUserRole);
router.get("/user-roles", getUserRoles);
router.get("/user-roles/:id", getUserRoleById);
router.put("/user-roles/:id", updateUserRole);
router.delete("/user-roles/:id", deleteUserRole);

export default router;
