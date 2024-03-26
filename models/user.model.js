const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fName:{
        type: String,
        required: [true, "First name is required"],
    },
    lName:{
        type: String,
        required: [true, "Last name is required"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true 
    },
    whatsapp:{
        type: Number,
        required: [true, "WhatsApp number is required"],
        unique: true 
    },
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true 
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    role:{
        type: String,
        required: [true, "Role is required"],
        enum: ['user', 'admin']
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('User', UserSchema);
