const express = require('express');
const router = express.Router();
const mapsController = require('../controller/maps.controller');
const { authUser, authCaptain } = require('../middlewares/auth.middleware');
const { query } = require('express-validator');

router.get('/get-coordinates',[query("address").isLength({min : 3})], authUser,mapsController.getCoordinates );

router.get('/get-distance-time',[query("origin").isLength({min : 3}),query("destination").isLength({min : 3})], authUser,mapsController.getDistanceTime);

router.get('/get-suggestions',[query("input").isLength({min : 3})], authUser,mapsController.getAutoSuggestions);


module.exports = router;