const express = require("express");
const captainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const {createCaptain} = require("../services/captain.service");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {fullname,email,password,vehicle} = req.body;
    const isUserExist = await captainModel.findOne({
        email: email
    });
    if(isUserExist){
        return res.status(400).json({message : "Captain Already Exists"});
    }
    const hashPassowrd = await captainModel.hashPassword(password);
    const captain = await createCaptain({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email : email,
        password : hashPassowrd,
        color : vehicle.color,
        plate : vehicle.plate,
        capacity : vehicle.capacity,
        vehicleType : vehicle.vehicleType
    });
    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });

}

module.exports.loginCaptain = async (req, res, next) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const captain = await captainModel.findOne({ email }).select("+password");
        if (!captain) {
            return res.status(401).json({ message: "Wrong Email or Password" });
        }

        // Compare passwords
        const match = await captain.comparePassword(password);
        if (!match) {
            return res.status(401).json({ message: "Wrong Email or Password" });
        }

        // Generate token
        const token = captain.generateAuthToken();

        // Send response
        return res.status(201).json({ token, captain });
    } catch (err) {
        console.error("Error in loginCaptain:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.captainProfile = async (req,res,next)=>{
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await blacklistTokenModel.create({
        token : token
    });
    return res.status(200).json({message : "Logged out"})

}