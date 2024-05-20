import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndsetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, email, password, comfirmPassword } = req.body;

        if (password !== comfirmPassword) {
            res.status(400).json({ error: "Password don't match!" });
        }

        const user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ error: "Email already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            //generate Token and set cookie
            generateTokenAndsetCookie(newUser._id, newUser.role, res);

            newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data!" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Interval server error!" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user?.password || ""
        );

        if (!user || !isPasswordCorrect) {
            return res
                .status(400)
                .json({ error: "Invalid email or password!" });
        }

        generateTokenAndsetCookie(user._id, user.role, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Interval server error!" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfuly!" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Interval server error!" });
    }
};
