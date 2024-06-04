import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    operatingTime: {
        type: String,
        default: "0",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: "0",
        ref: "User",
    },
    userIdNext: {
        type: String,
        default: "0",
    },
});

const Table = mongoose.model("Table", tableSchema);

export default Table;
