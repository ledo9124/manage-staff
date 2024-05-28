import express from "express";
import { getAllStaffs } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/allStaffs", getAllStaffs);

export default router;
