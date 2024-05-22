import express from "express";
import dotenv from "dotenv";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

import authRoutes from "./routes/auth.route.js";
import tableRoutes from "./routes/table.route.js";

app.use("/api/auth", authRoutes);
app.use("/api/table", tableRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}!`);
});
