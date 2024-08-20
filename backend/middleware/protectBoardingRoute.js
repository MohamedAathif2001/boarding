import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'

export const protectBoardingRoute = async (req, res, next)=>{
    try {

        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({ error: "Unauthorized No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized Invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(user.usertype !== 'giver'){
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log('error in protectBoardingRoute middleware', error.message);
        res.status(500).json({error: 'Internal Server Error'})
    }
}