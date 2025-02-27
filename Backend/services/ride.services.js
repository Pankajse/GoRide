const rideModel = require('../models/ride.model');
const mapServices = require('./maps.services');
const crypto = require('crypto');

const getOtp = (num) => {
    if (num <= 0) {
        throw new Error("Number of digits must be greater than zero");
    }
    const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
    return otp;
};

const getFare = async (pickup, destination) => {
    if(!pickup || !destination) {
        throw new Error("Invalid Pickup or Destination");
    }
    const distanceTime = await mapServices.getDistanceTime(pickup, destination);
    const distance = distanceTime.distance.value / 1000; // converting meters to kilometers
    const time = distanceTime.duration.value / 60; // converting seconds to minutes

    const fareRates = {
        bike: { baseFare: 20, distance: 5, time: 1 }, // base fare, rate per km and per minute for bike
        auto: { baseFare: 30, distance: 10, time: 2 }, // base fare, rate per km and per minute for auto
        car: { baseFare: 50, distance: 15, time: 3 } // base fare, rate per km and per minute for car
    };

    const fare = {
        bike: fareRates.bike.baseFare + (distance * fareRates.bike.distance) + (time * fareRates.bike.time),
        auto: fareRates.auto.baseFare + (distance * fareRates.auto.distance) + (time * fareRates.auto.time),
        car: fareRates.car.baseFare + (distance * fareRates.car.distance) + (time * fareRates.car.time)
    };
    return fare;
    
}



module.exports.createRide = async ({userId, pickup, destination, vehicleType  }) => {
    try {
        const fare = await getFare(pickup, destination);
        const otp = getOtp(4);
    const ride = await rideModel.create({
        user: userId,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp
    });
    return ride;
    }catch(error){
        throw new Error(error.message);
    }
}
