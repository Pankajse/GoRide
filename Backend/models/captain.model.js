require('dotenv').config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema  = new mongoose.model({
    fullname : {
        firstname :{
            type : String,
            required : true,
            minLength : [3,"firstname should be atleast 3 letters"]
        },
        lastname : {
            type : String,
            minLength : [3,"firstname should be atleast 3 letters"]
        }
    },
    email : {
        type : String,
        required : true,
        minLength : [5,"email should contain atleast 5 letters"]
    },
    password : {
        type : String,
        required : true,
        minLength : [6,"password should contain atleast 6 letters"]
    },
    status : {
        type : String,
        enum : ['active','inactive'],
        default : 'inactive'
    },
    vehicle : {
        color : {
            type : String,
            required : true,
            min : [2,"Color should contain atleast 2 letters"]
        },
        plate : {
            type : String,
            required : true,
            min : [2,"Number plate should contain atleast 2 letters"]
        },
        capacity : {
            type : Number,
            required : true,
            min : [1,"Capacity should be atleast 1"]
        },
        vehicleType :{
            type : String,
            required : true,
            enum : ['scotter','motorcycle','car','auto']
        },
        model : {
            type : String,
            required : true,
            min : [2,"Model should contain atleast 2 letters"]
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id : this._id},process.env.JWT_SECRET);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password);
}

const captainModel = mongoose.model("captain",captainSchema);

module.exports = captainModel