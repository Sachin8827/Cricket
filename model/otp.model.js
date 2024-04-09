import mongoose from "mongoose";


const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // OTP expires after 10 minutes (600 seconds)
    }
});

const OTP = mongoose.model('otp', OTPSchema);

const storeOTP = async (email, otp) => {
    try {
        const newOTP = new OTP({
            email,
            otp
        });
        await newOTP.save();
    } catch (error) {
        console.error('Error storing OTP:', error);
        throw error;
    }
};

const retrieveOTP = async (email) => {
    try {
        // Find the OTP document by email
        return await OTP.findOne({ email });
    } catch (error) {
        console.error('Error retrieving OTP:', error);
        throw error;
    }
};

export { OTP, storeOTP, retrieveOTP };
