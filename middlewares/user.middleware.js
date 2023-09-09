import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;


export const requireAuth = async (req, res, next) => {

    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({error: "You must be logged in. Auth token not found."});
    }

    const token = authorization.replace("Bearer ", "");


    try {
        const {_id } = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.user = await UserModel.findOne({_id}).select("_id");
        next();
    } catch (error) {
        return res.status(401).json({error: "You must be logged in. Auth token not valid."});
    }
   
}



// const token = req.cookies.jwt;
// if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
//         if (err) {
//             console.error(err.message);
//             res.redirect("/login");
//         } else {
//             next();
//         }
//     });
// } else {
//     res.redirect("/login");
// }