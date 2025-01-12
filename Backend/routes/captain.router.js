const express = require("express");
const {body} = require("express-validator");
const router = express.Router();
const captainController = require("../controller/captain.controller");
const { authCaptain } = require("../middlewares/auth.middleware");

router.post("/register",[
    body("email").isEmail().withMessage("Enter valid Email"),
    body("fullname.firstname").length({min:3}).withMessage("Name should be more than 3 characters"),
    body("password").length({min:6}).withMessage("Password greater than 6 characters"),
    body("vehicle.color").length({min:3}).withMessage("Color Length greater than 3 characters"),
    body("vehicle.plate").length({min:3}).withMessage("Plate Length greater than 3 characters"),
    body("vehicle.capacity").isNumeric().withMessage("Capacity should be a number"),
    body("vehicle.vehicleType").isIn(['scotter','motorcycle','car','auto']).withMessage("Invalid Vehicle Type"),
    body("vehicle.model").length({min:3}).withMessage("Model Length greater than 3 characters"),
],captainController.registerCaptain);

router.post("/login",[
    body("email").isEmail().withMessage("Enter Valid Email"),
    body("password").length({min:3}).withMessage("Password should greater than 6 characters")
],captainController.registerCaptain);

router.get("/profile",authCaptain,captainController.captainProfile);
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router;