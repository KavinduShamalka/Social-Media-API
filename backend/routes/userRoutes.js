import express from "express";
import { getAllUsers, login, signup } from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signup);
router.post("/login", login);

export default router;