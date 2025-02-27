const { getAddressCoordinates,getDistanceTime,getAutoSuggestions } = require("../services/maps.services")
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;
    try {
        const coordinates = await getAddressCoordinates(address);
        res.status(200).json({ coordinates });
    } catch (error) {
        res.status(500).json({ message: "Error fetching coordinates" });
    }
}

module.exports.getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    try {
        const distanceTime = await getDistanceTime(origin, destination);
        res.status(200).json({ distanceTime });
    } catch (error) {
        res.status(500).json({ message: "Error fetching distance and time" });
    }
}

module.exports.getAutoSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { input } = req.query;
    try {
        const suggestions = await getAutoSuggestions(input);
        res.status(200).json({ suggestions });
    } catch (error) {
        res.status(500).json({ message: "Error fetching suggestions" });
    }
}