import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type:String,
        required: true,
        default: 'https://picsum.photos/200'
    },
    timeWork: {
        type: String,
        required: true,
        default: '0'
    },
    timeRest: {
        type: String,
        required: true,
        default: '0'
    },
    special: {
        type: String,
        required : true,
        default: '1'
    },
    status: {
        type: Boolean,
        required : true,
        default: false
    },
    role: {
        type: String,
        required : true,
        default: '1'
    }
});

const User = mongoose.model("User" , userSchema);

export default User;