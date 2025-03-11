const express = require("express");
const {body} = require("express-validator");
const router = express.Router();
const captainController = require("../controller/captain.controller");
const { authCaptain } = require("../middlewares/auth.middleware");

router.post("/register",[
    body("email").isEmail().withMessage("Enter valid Email"),
    body("fullname.firstname").isLength({min:3}).withMessage("Name should be more than 3 characters"),
    body("password").isLength({min:6}).withMessage("Password greater than 6 characters"),
    body("vehicle.color").isLength({min:3}).withMessage("Color Length greater than 3 characters"),
    body("vehicle.plate").isLength({min:3}).withMessage("Plate Length greater than 3 characters"),
    body("vehicle.capacity").isNumeric().withMessage("Capacity should be a number"),
    body("vehicle.vehicleType").isIn(['moto','car','auto']).withMessage("Invalid Vehicle Type")
],captainController.registerCaptain);

router.post("/login",[
    body("email").isEmail().withMessage("Enter Valid Email"),
    body("password").isLength({min:6}).withMessage("Password should greater than 6 characters")
],captainController.loginCaptain);

router.get("/profile",authCaptain,captainController.captainProfile);
router.get('/logout', authCaptain, captainController.logoutCaptain)

module.exports = router;