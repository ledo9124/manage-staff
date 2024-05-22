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
        type: String,
        default: "0",
    },
    userIdNext: {
        type: String,
        default: "0",
    },
});

const Table = mongoose.model("Table" , tableSchema);

export default Table;
