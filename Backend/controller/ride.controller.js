const rideService = require('../services/ride.services');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {  pickup, destination, vehicleType } = req.body;
    try {
        const ride = await rideService.createRide({userId : req.user._id, pickup, destination, vehicleType});
        res.status(201).json({ ride });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}