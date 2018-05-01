// DEPENDENCIES
const firebase = require("../util/firebase.js");
const MedicationHistory = firebase.db.MedicationHistory;

// STATICS
MedicationHistory.exists = async key => {
  return await MedicationHistory.getKeysExist([key]);
}

// EXPORTS
module.exports = MedicationHistory;
