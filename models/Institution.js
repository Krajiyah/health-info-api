// DEPENDENCIES
const firebase = require("../util/firebase.js");
const Institution = firebase.db.Institution;

// STATICS
Institution.exists = async key => {
  return await Institution.getKeysExist([key]);
}

// EXPORTS
module.exports = Institution;
