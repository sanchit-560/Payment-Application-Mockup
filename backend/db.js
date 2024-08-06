const mongoose = require('mongoose');
const { float } = require('webidl-conversions');
mongoose.connect("mongodb+srv://itzsanchitkhosla:p-uzpeK8h6Y-n_B@cluster0.mkahtsg.mongodb.net/")
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})
const AccountsSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User', //It will prevent from creating an account for user which does not exist as we have referenced User table in the account schema. 
        required:true
    },
    balance:{
       type:Number,
       required:true
    }
})
const Account = mongoose.model("Account", AccountsSchema)
const User = mongoose.model("User", UserSchema)
module.exports = {
  User, Account
}