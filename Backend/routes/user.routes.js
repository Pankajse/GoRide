const express = require("express");
const {body} = require("express-validator");
const router = express.Router();
const userController = require("../controller/user.controller");
const {authUser} = require("../middlewares/auth.middleware");

router.post(
    "/register",
    [
      body("email").isEmail().withMessage("Invalid Email"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password should be more than 6 characters"),
      body("fullname.firstname")
        .isLength({ min: 3 })
        .withMessage("First Name should be greater than 3 characters"),
    ],
    userController.registerUser
  );

router.post("/login",[
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Password greater than 6 words")
  ],
  userController.loginUser
)

router.get("/profile",authUser,userController.getUserProfile)

router.post("/logout",authUser,userController.logoutUser)

module.exports = router