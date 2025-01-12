require('dotenv').config();
const mongoose = require("mongoose")
console.log(process.env.DB_URL)
const connectToDb = ()=>{
    mongoose.connect(process.env.DB_URL)
}

module.exports= connectToDb