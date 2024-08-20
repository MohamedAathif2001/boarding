import mongoose from "mongoose";

const boardingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        address: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        photos: [
            {
                type: String,
            }
        ],
        description: {
            type: String,
        },
    }, {timeStamps: true}
);

const Boarding = mongoose.model('Boarding', boardingSchema);

export default Boarding;