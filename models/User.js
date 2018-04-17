// DEPENDENCIES
const firebase = require("../util/firebase.js");
const overrideUtil = require("../util/overrides.js");
const User = firebase.db.User;
const fcm = firebase.fcm;

// PROTOTYPES


// STATICS
User.exists = async key => await User.getKeysExist([key]);

// EXPORTS
module.exports = User;
