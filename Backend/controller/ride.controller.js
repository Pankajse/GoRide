const rideService = require('../services/ride.services');
const mapService = require('../services/maps.services');
const { validationResult } = require('express-validator');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.body;
    try {
        const ride = await rideService.createRide({userId : req.user._id , pickup, destination, vehicleType});
        res.status(201).json({ ride });

        const {ltd,lng} = await mapService.getAddressCoordinates(pickup);
        const captainsInRadius = await mapService.getCaptainsInTheRadius(ltd,lng,3);
        ride.otp = "";

        // Log captains found in the radius
        console.log('Captains in radius:', captainsInRadius);

        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user');

        captainsInRadius.map(captain => {

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination } = req.body;
    try {
        const fare = await rideService.getFare( pickup, destination);
        res.status(200).json({ fare });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.verifyOtp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { otp, rideId } = req.body;
    try {
        const ride = await rideService.verifyOtp(otp,rideId);
        sendMessageToSocketId(ride.user.socketId, { event: 'ride-started', data: ride });
        res.status(200).json({ ride });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.accepted = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const ride = await rideService.accepted(rideId, req.captain._id);

        sendMessageToSocketId(ride.user.socketId, { event: 'ride-accepted', data: ride });

        res.status(200).json({ ride });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const ride = await rideService.endRide({rideId,captainId : req.captain._id});
        sendMessageToSocketId(ride.user.socketId, { event: 'ride-completed', data: ride });
        res.status(200).json({ ride });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}