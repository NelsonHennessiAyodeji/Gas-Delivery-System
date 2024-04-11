const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide a username"],
        minLength: 3,
        maxLength: 25
    },
    lastName: {
        type: String,
        required: [true, "Please provide a username"],
        minLength: 3,
        maxLength: 25
    },
    country: {
        type: String,
        required: [true, "Please provide the country you're from"],
        minLength: 3,
        maxLength: 25
    },
    address: {
        type: String,
        required: [true, "Please provide your address"],
        minLength: 6,
    },
    city: {
        type: String,
        required: [true, "Please provide your city of residence"],
        minLength: 3,
    },
    state: {
        type: String,
        required: [true, "Please provide your state of residence"],
        minLength: 3,
    },
    zipcode: {
        type: String,
        required: [true, "Please provide your residence's zipcode"],
        minLength: 3,
    },
    phone: {
        type: String,
        required: [true, "Please provide a cellphone number"],
        minLength: 11,
        maxLength: 11
    },
    email: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        minLength: 11,
        maxLength: 50
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: 6
    },
    walletBalance: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

UserSchema.pre('save', async function () {
    if (!this.isModified('password')){
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePasswords = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
