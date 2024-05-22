import express from "express";
import { createTable, getTables } from "../controllers/table.controller.js";

const router = express.Router();

router.get("/" , getTables)
router.post("/create" , createTable)

export default router;