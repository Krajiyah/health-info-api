// DEPENDENCIES
const firebase = require("../util/firebase.js");
const Appointment = firebase.db.Appointment;

// STATICS
Appointment.exists = async key => await Appointment.getKeysExist([key]);

// EXPORTS
module.exports = Appointment;
