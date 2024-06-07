import express from "express";
import { createTable, getTables } from "../controllers/table.controller.js";
import { closeTable, openTable } from "../controllers/handleTable.controller.js";

const router = express.Router();

router.get("/", getTables);
router.post("/create", createTable);

// Division handle table

router.get("/openTable/:id", openTable);
router.get("/closeTable/:id", closeTable);

export default router;
