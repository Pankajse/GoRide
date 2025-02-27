const express = require("express");
const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()});
    }
    const {fullname,password,email} = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
    }
    const hashPassword = await userModel.hashPassword(password);
    const user = await userService.createUser(fullname.firstname,fullname.lastname,email,hashPassword);
    
    const token = user.generateAuthToken();
    res.status(201).json({token,user});
}

module.exports.loginUser = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    const user = await userModel.findOne({
        email : email
    }).select('+password');
    if(!user){
        return res.status(400).json({ message: "User does not exist" });
    }
    const match = await user.comparePassword(password);
    if(!match){
        return res.status(401).json({message : "Wrong Password or Email"})
    }
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(201).json({token,user});
}

module.exports.getUserProfile = (req,res)=>{
    const user = req.user
    return res.status(200).json({user});
}

module.exports.logoutUser = async (req, res) => {
    res.clearCookie("token");
    
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
        return res.status(400).json({ message: "No token provided" });
    }
    try {
        const existingToken = await blacklistTokenModel.findOne({ token });
        if (!existingToken) {
            await blacklistTokenModel.create({ token });
        }
        
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
