import express from "express";
import {
  createUser,
  verifyToken,
  updatePassword,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/users", createUser);
router.get("/verify/:token", verifyToken);
router.put("/users/password", updatePassword);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
