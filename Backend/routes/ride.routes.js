const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const rideController = require('../controller/ride.controller');
const { authUser,authCaptain } = require('../middlewares/auth.middleware');

router.post("/create-ride",authUser,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid Pickup Location"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination Location"),
    body("vehicleType").isIn(['moto', 'car', 'auto']).withMessage("Invalid Vehicle Type"),
    rideController.createRide
)

router.post('/accepted',authCaptain,
    body("rideId").isMongoId().withMessage("Invalid Ride Id"),
    rideController.accepted
)

router.post("/verify-otp",authCaptain,
    body('rideId').isMongoId().withMessage("Invalid Ride Id"),
    body("otp").isNumeric().isLength({ min: 4, max: 4 }).withMessage("Invalid OTP"),
    rideController.verifyOtp
)

router.post("/get-fare",authUser,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid Pickup Location"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination Location"),
    rideController.getFare
)

router.post('/end-ride',authCaptain,
    body("rideId").isMongoId().withMessage("Invalid Ride Id"),
    rideController.endRide
)

module.exports = router;