import validator from 'validator';
import bcrypt from 'bcryptjs';

import User from '../models/userModel.js'
import { generateTokenAndSetCookie } from '../lib/generateToken.js';

//fix returning the password 

export const signup = async (req, res) => {

    try {

        const { username, email, password, usertype } = req.body;

        if(!username || !email || !password || !usertype){
            return res.status(400).json({ message: 'All fields are required' });
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({ message: 'Invalid email' });
        }

        const existingUsername = await User.findOne({ username});

        if(existingUsername){
            return res.status(400).json({ message: 'Username already exists' });
        }

        const existingEmail = await User.findOne({ email});

        if(existingEmail){
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User ({
            username: username,
            email: email,
            password: passwordHash,
            usertype: usertype
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({ user: newUser });
        } 
        else {
            res.status(400).json({ message: 'Invalid user data' });
        }
        
    } catch (error) {
        console.log(error, "error in signup controller")
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const login = async (req, res) => {

    try {
        
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ message: 'Invalid email' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(400).json({ message: 'Invalid password' });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({ user: user });

    } catch (error) {
        console.log(error, "error in login controller")
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message: "Logout successful"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" }); 
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}