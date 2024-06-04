import express from "express";
import { createTable, getTables } from "../controllers/table.controller.js";
import { openTable } from "../controllers/handleTable.controller.js";

const router = express.Router();

router.get("/", getTables);
router.post("/create", createTable);

// Division handle table

router.post("/openTable/:id", openTable);

export default router;
