require('dotenv').config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minLength : [3,"First name must be more than Characters"]
        },
        lastname : {
            type : String,
        }
    },
    email : {
        type : String,
        unique : true,
        required : true,
        minLength : [5,"Email must be more than 5 Characters"]
    },
    password:{
        type : String,
        required : true,
        select : false
    },
    socketId :{
        type : String
    },

})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id},process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async (password)=>{
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;