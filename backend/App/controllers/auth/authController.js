"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../../models');
const User = db.user;

class AuthController {

    // Login User
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email) {
                return res.status(400).json({ status: false, message: "Email is required" });
            }
            if (!password) {
                return res.status(400).json({ status: false, message: "Password is required" });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ status: false, message: "Invalid credentials" });
            }

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET, { expiresIn: "1h" });

            res.cookie('token', token, {
                httpOnly: false,
                secure: false,
                sameSite: 'Strict',
                maxAge: 3600 * 1000 // 1 hour
            });

            const { password: _, ...userWithoutPassword } = user.toObject();

            return res.status(200).json({
                status: true,
                message: "Login successful",
                user: userWithoutPassword,
                token,
                expiresIn: 3600,
                role: user.role
            });

        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({ status: false, message: "Server error", error: error.message });
        }
    }

    // Register User
    async register(req, res) {
        try {
            const { FullName, Email, Password, PhoneNo } = req.body;

            if (!FullName || !Email || !Password || !PhoneNo) {
                return res.status(400).json({ status: false, message: "All fields are required" });
            }

            const existingUser = await User.findOne({
                $or: [
                    { Email },
                    { PhoneNo }
                ]
            });

            if (existingUser) {
                return res.status(409).json({ status: false, message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(Password, 10);

            const newUser = new User({
                FullName,
                email: Email,
                password: hashedPassword,
                phone: PhoneNo,
                role: "USER"
            });

            const savedUser = await newUser.save();

            const { Password: _, ...userWithoutPassword } = savedUser.toObject();

            return res.status(201).json({
                status: true,
                message: "User registered successfully",
                user: userWithoutPassword
            });

        } catch (error) {
            console.error("Registration error:", error);
            return res.status(500).json({ status: false, message: "Server error", error: error.message });
        }
    }
}

module.exports = new AuthController();
