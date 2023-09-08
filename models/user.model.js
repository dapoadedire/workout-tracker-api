import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import fetch from "node-fetch"; // Import the fetch module

import dotenv from "dotenv";
dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        group: {
            type: String,
            enum: ["user", "admin", "editor"], // Define the possible user groups
            default: "user", // Set a default group
        },
        location: {
            // Add a new field for storing the IP address
            type: String,
        },
    },
    {
        timestamps: true,
        collection: "User",
    }
);

// static signup method

userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw new Error("All fields are required");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Email is invalid");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error(
            "Password is too weak. Make sure it is at least 8 characters long and contains a lowercase letter, an uppercase letter, a number, and a symbol."
        );
    }

    const existingUser = await this.findOne({ email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    let city = "";
    let region = "";
    let country = "";

    try {
        const response = await fetch("https://ipinfo.io/json");
        const data = await response.json();
        city = data.city;
        region = data.region;
        country = data.country;
    } catch (error) {
        console.error("Error fetching IP address:", error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //   console.log(ADMIN_EMAIL == email )
    //   console.log(ADMIN_EMAIL)
    //   console.log(email)

    const newUser = await this.create({
        email,
        password: hashedPassword,
        group: email == ADMIN_EMAIL ? "admin" : "user",
        location: `${city}, ${region}, ${country}`,
    });

    return newUser;
};


// static login method

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw new Error("All fields are required");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Email is invalid");
    }


    const user = await this.findOne({ email });
    if (!user) {
        throw new Error("User with this email does not exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return user;
}


export const UserModel = model("User", userSchema);
