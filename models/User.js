// DEPENDENCIES
const firebase = require("../util/firebase.js");
const overrideUtil = require("../util/overrides.js");
const User = firebase.db.User;
const fcm = firebase.fcm;
const storage = firebase.storage;

// PROTOTYPES


// STATICS
User.exists = async key => await User.getKeysExist([key]);
User.notExists = async key => !(await User.exists(key));

User.create = async params => {
  let imageUrl = await storage.upload(params.image);
  return await User.createByManualKey(params.key, {
    firstName: params.firstName,
    lastName: params.lastName,
    phoneNumber: params.phoneNumber,
    email: params.email,
    imageUrl: imageUrl
  });
}

// EXPORTS
module.exports = User;
