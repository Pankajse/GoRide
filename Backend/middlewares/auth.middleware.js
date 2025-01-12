require('dotenv').config();
const express = require("express");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blacklistToken.model");
const userModel = require('../models/user.model');

module.exports.authUser = async (req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    console.log(token);
    if(!token){
        return res.status(401).json({message : "Unauthorized User"});
    }

    const isBlacklist = await BlacklistToken.findOne({
        token : token
    })
    if(isBlacklist){
        return res.status(401).json({message : "Unauthorized User"})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if(!user){
            console.log("User not found");
        }
        req.user = user;
        next();
    }catch(error){
        return res.status(401).json({ message: 'Unauthorized' });
    }
}