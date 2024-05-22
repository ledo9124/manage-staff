import Table from "../models/table.model.js";

export const getTables = async (req, res) => {
    try {
        const tables = await Table.find({});

        if (!tables) {
            res.status(200).json({});
        }

        res.status(200).json(tables);
    } catch (error) {
        console.log("Error in getTables table controller", error.message);
        res.status(500).json({ error: "Interval Server Error!" });
    }
};

export const createTable = async (req, res) => {
    try {
        const { name } = req.body;

        const table = await Table.findOne({ name });

        if (table) {
            return res
                .status(400)
                .json({ error: "Name table already exists!" });
        }

        const newTable = new Table({
            name,
        });

        if (newTable) {
            newTable.save();

            return res.status(201).json({ name });
        }

        res.status(400).json({ error: "Invalid table name!" });
    } catch (error) {
        console.log("Error in createTable table controller", error.message);
        res.status(500).json({ error: "Interval Server Error!" });
    }
};
