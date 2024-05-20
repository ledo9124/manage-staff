import jwt from "jsonwebtoken";

const generateTokenAndsetCookie = (userId, role , res) => {
    const token = jwt.sign({ userId , role }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60,
        httpOnly: true,
        sameSite: "strict",
    });
};

export default generateTokenAndsetCookie;
