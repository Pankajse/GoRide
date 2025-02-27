const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const rideController = require('../controller/ride.controller');
const { authUser } = require('../middlewares/auth.middleware');

router.post("/create-ride",authUser,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid Pickup Location"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination Location"),
    body("vehicleType").isIn(['scotter', 'motorcycle', 'car', 'auto']).withMessage("Invalid Vehicle Type"),
    rideController.createRide
)

module.exports = router;