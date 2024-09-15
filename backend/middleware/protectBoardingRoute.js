import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'

export const protectBoardingRoute = async (req, res, next)=>{
    try {

        const user = req.user;

        if(user.usertype !== 'giver'){
            return res.status(401).json({ error: "Unauthorized" });
        }
        
        next();
        
    } catch (error) {
        console.log('error in protectBoardingRoute middleware', error.message);
        res.status(500).json({error: 'Internal Server Error'})
    }
}