// DEPENDENCIES
const firebase = require("../util/firebase.js");
const User = firebase.db.User;
const GeneralInfo = firebase.db.GeneralInfo;
const fcm = firebase.fcm;
const storage = firebase.storage;

// PROTOTYPES
User.prototype.setImage = async function(field, file) {
  let url = await storage.upload(file);
  let val = {};
  val[field] = url;
  await this.update(val);
  return url;
}

User.prototype.hasGeneralInfo = async function() {
  let o = await GeneralInfo.getAllByFields({
    user: this.getKey()
  });
  return o.length > 0;
}

User.prototype.getGeneralInfo = async function() {
  let o = await GeneralInfo.getAllByFields({
    user: this.getKey()
  });
  return o[0];
}

User.prototype.setGeneralInfo = async function(params) {
  let o = await GeneralInfo.getAllByFields({
    user: this.getKey()
  });
  let val = {
    user: this.getKey(),
    dateOfBirth: params.dateOfBirth,
    sex: params.sex,
    maritalStatus: params.maritalStatus,
    occupation: params.occupation
  };
  if (o.length > 0) {
    o = o[0];
    await o.update(val);
  } else {
    o = await GeneralInfo.createByAutoKey(val);
  }
  return o;
}

// STATICS
User.exists = async key => await User.getKeysExist([key]);
User.notExists = async key => !(await User.exists(key));

User.hasGeneralInfo = async key => {
  let user = await User.getByKey(key);
  return user.hasGeneralInfo();
}

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
