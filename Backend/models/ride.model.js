const mongoose = require('mongoose');
const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    pickup: {
        type: String,
        required: true,
        minLength: [3, "Invalid Pickup Location"]
    },
    destination: {
        type: String,
        required: true,
        minLength: [3, "Invalid Destination Location"]
    },
    fare : {
        type : Number,
        required : true,
        min : [0,"Fare should be non-negative"]
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
        default: "pending"
    },
    duration :{
        type : Number, //in meters
        min : [0, "Duration should be non-negative"]
    },
    distance :{
        type : Number, //in seconds
        min : [0, "Distance should be non-negative"]
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "captain"
    },
    paymentId : {
        type : String
    },
    orderId : {
        type : String
    },
    signature : {
        type : String
    },
    otp : {
        type : String,
        select : false,
        required : true,
    }
},{
    timestamps : true
});

const rideModel = mongoose.model("ride", rideSchema);

module.exports = rideModel;