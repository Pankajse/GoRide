require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.router")
const mapRoutes = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.routes");

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
connectToDb();

app.use(cors());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.use("/users",userRoutes);
app.use("/captains",captainRoutes);
app.use("/maps",mapRoutes);
app.use("/rides",rideRoutes);
module.exports= app