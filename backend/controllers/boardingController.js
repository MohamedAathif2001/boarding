import validator from "validator";


import User from "../models/userModel";
import Boarding from "../models/boardingModel";

export const createBoarding = async (req, res) => {
    try {
        
        

    } catch (error) {
        console.log('error in createBoarding controller', error);
        res.status(500).json({error: 'Internal Server Error'})
    }
}