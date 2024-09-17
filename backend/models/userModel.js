import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String, required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    //seeker or giver
    usertype: {     
        type: String,
        enum:["seeker","giver"],
        default:"seeker",
        required: true
    },
    
}, {timeStamps: true});

const User = mongoose.model('User', userSchema);

export default User;