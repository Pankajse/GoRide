require('dotenv').config();
const mongoose = require("mongoose");
console.log(process.env.DB_URL);
const connectToDb = () => {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err.message);
        });
};

module.exports = connectToDb; 

