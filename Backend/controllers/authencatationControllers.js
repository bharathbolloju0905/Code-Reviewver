const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only send cookies over HTTPS in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Needed for cross-origin requests
    path: "/" // Available across the entire app
};

module.exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Password should be at least 6 characters long" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.cookie("token", token, COOKIE_OPTIONS);
        newUser.password = undefined;

        return res.status(201).json({ message: "User Created Successfully", user: newUser });
    } catch (err) {
        console.log("registerControllerError", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }

        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.cookie("token", token, COOKIE_OPTIONS);
        user.password = undefined;

        return res.status(200).json({ message: "User Logged In Successfully", user });
    } catch (err) {
        console.log("loginController error", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.logoutController = async (req, res) => {
    try {
        res.clearCookie("token", COOKIE_OPTIONS);
        return res.status(200).json({ message: "User Logged Out Successfully" });
    } catch (error) {
        console.log("logoutController error", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
