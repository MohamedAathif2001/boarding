import validator from "validator";

import User from "../models/userModel.js";
import Boarding from "../models/boardingModel.js";

//handle images

export const createBoarding = async (req, res) => {
    try {
        const {address, phoneNumber} = req.body;
        const userId = req.user._id.toString();
        let {description} = req.body;
        let {photos} = req.body;

        const user = User.findById(userId);
        if(!user){
            return res.status(404).json({error: 'user not found'});
        }

        if(!address || !phoneNumber){
            return res.status(400).json({error: 'address and phoneNumber are compulsory'})
        }

        const newBoarding = new Boarding({
            userId,
            address,
            phoneNumber,
            description,
            photos
        })

        await newBoarding.save();

        res.status(200).json(newBoarding);

    } catch (error) {
        console.log('error in createBoarding controller', error);
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export const deleteBoarding = async (req,res) => {
    try {
        
        const boarding = await Boarding.findById(req.params.id);

        if(!boarding){
            return res.status(401).json({error: 'Boarding not found to delete'})
        }

        if(boarding.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({ error: 'You are not authorized to delete this post'});
        }

        await Boarding.findByIdAndDelete(req.params.id);

        res.status(200).json({message: 'Boarding deleted successfully'})


    } catch (error) {
        console.log('error in deleteBoarding controller', error);
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export const getAllBoardings = async (req,res) =>{
    try {
        
        const boardings = await Boarding.find();

        if (boardings.length === 0){
            return res.status(200).json([]);
        }

        res.status(200).json(boardings);

    } catch (error) {
        console.log('error in getAllBoardings controller', error);
        res.status(500).json({error: 'Internal Server Error'})
    }
}