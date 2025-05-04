import express from "express";
import {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
} from "../controllers/user.controller";

const router = express.Router();

router.get("/", getAllUsersHandler);
router.get("/:id", getUserByIdHandler);
router.post("/", createUserHandler);
router.patch("/:id", updateUserHandler);
router.delete("/:id", deleteUserHandler);

export default router;
