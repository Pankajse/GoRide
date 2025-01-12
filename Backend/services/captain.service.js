const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({firstname, lastname, email, password, color, plate, capacity, vehicleType,model}) => {
    if(!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType || !model){
        throw new Error("All Fields are required");
    }
    const captain = await captainModel.create({
        fullname : {
            firstname : firstname,
            lastname : lastname
        },
        email,password,
        vehicle : {
            color : color,
            plate : plate,
            capacity : capacity,
            vehicleType : vehicleType,
            model : model
        }
    });
    return captain;
    
}