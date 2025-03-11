const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinates = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        if (data.status === "OK") {
            const location = data.results[0].geometry.location;
            return {
                ltd : location.lat,
                lng : location.lng
            }
        } else {
            throw new Error("Error fetching data from Google Maps API");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error("Origin and Destination are required");
    }
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        if (data.status === "OK") {
            if(data.rows[0].elements[0].status === "Zero_results"){
                throw new Error("Invalid Origin or Destination");
            }
            return data.rows[0].elements[0];
        } else {
            throw new Error("Error fetching data from Google Maps API");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports.getAutoSuggestions = async (input) => {
    if(!input){
        throw new Error("Input is required");
    }
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        if (data.status === "OK") {
            return data.predictions;
        } else {
            console.error("Error response from Google Maps API:", data);
            throw new Error("Error fetching data from Google Maps API");
        }
    } catch (error) {
        console.error("Error fetching auto suggestions:", error);
        throw error;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    if(!ltd || !lng || !radius){
        throw new Error("Latitude, Longitude and Radius are required");
    }
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;
}