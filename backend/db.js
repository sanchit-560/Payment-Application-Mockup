const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://itzsanchitkhosla:svx7Y586c940qvpA@cluster0.mkahtsg.mongodb.net/")
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength: 3,
        maxLength:50,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        minLength: 3,
        maxLength:50,
        trim:true
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        minLength: 3,
        maxLength:50,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minLength: 3,
        maxLength:50,
        trim:true,
    }
})

const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    balance:{
        type:Number,
        required:true,
    }
})


const User = mongoose.model("User", userSchema);
const Accounts = mongoose.model("Accounts", accountSchema);


module.exports = {
    User,Accounts
}