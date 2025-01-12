const express = require("express");
const captainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const {createCaptain} = require("../services/captain.service");

module.exports.registerCaptain = async(req,res,next) =>{
    const errors = validationResult("req");
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
    const hashPassowrd = await captainModel.hashPassowrd(password);
    const captain = createCaptain({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email : email,
        password : hashPassowrd,
        color : vehicle.color,
        plate : vehicle.plate,
        capacity : vehicle.capacity,
        vehicleType : vehicle.vehicleType,
        model : vehicle.model
    })
    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });

}

module.exports.loginCaptain = async(req,res,next)=>{
    const error = validationResult(req);
    if(!error().isEmpty()){
        return res.status(400).json({error : error.array()})
    }
    const captain = await captainModel.findOne({
        email : email
    }).select("+password");
    const match = await captain.comparePassword(password);
    if(!match){
        return res.status(401).json({message : "Wrong Password or Email"})
    }
    const token = captain.generateAuthToken();
    return res.status(201).json({token,user});
}

module.exports.captainProfile = async (req,res,next)=>{
    const captain = req.captain;
    return res.status(201).json({captain});
}

module.exports.logoutCaptain = async (req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await blacklistTokenModel.create({
        token : token
    });
    return res.status(200).json({message : "Logged out"})

}