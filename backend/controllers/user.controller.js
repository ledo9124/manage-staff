import User from "../models/user.model.js";

export const getAllStaffs = async (req, res) => {
    try {
        const allStaffs = await User.find({ role: "1" }).select("-password");

        if (!allStaffs) {
            return res.status(200).json({});
        }

        res.status(200).json(allStaffs);
    } catch (error) {
        console.log("Error in getAllStaffs user controller", error.message);
        res.status(500).json({ error: "Interval Server Error!" });
    }
};
