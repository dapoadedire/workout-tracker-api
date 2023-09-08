import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const createAccessToken = (_id) => {
    return jwt.sign({ _id }, ACCESS_TOKEN_SECRET, {
        expiresIn: "3d",
    });
};

// login user

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.login(email, password);

        // create access token
        const accessToken = createAccessToken(user._id);
        console.log("accessToken is : ", accessToken);

        res.status(201).json({
            email,
            token: accessToken,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

    // res.json({ message: "login user" });
};

// signup user

const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = await UserModel.signup(email, password);

        // create access token
        const accessToken = createAccessToken(newUser._id);
        console.log("accessToken is : ", accessToken);

        res.status(201).json({
            email,
            token: accessToken,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// get all users

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().sort({ createdAt: -1 });
        res.status(200).json({ users });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export { loginUser, signupUser, getAllUsers };
