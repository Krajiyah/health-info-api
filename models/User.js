// DEPENDENCIES
const firebase = require("../util/firebase.js");
const User = firebase.db.User;
const Appointment = firebase.db.Appointment;
const EmergencyContact = firebase.db.EmergencyContact;
const GeneralInfo = firebase.db.GeneralInfo;
const LocationInfo = firebase.db.LocationInfo;
const storage = firebase.storage;
const auth = firebase.auth;

// PROTOTYPES
User.prototype.setImage = async function(field, file) {
  let url = await storage.upload(file);
  let val = {};
  val[field] = url;
  await this.update(val);
  return url;
}

User.prototype.getAppointments = async function() {
  return await Appointment.getAllByFields({
    user: this.getKey()
  });
}

User.prototype.hasData = async function(model) {
  let o = await model.getAllByFields({
    user: this.getKey()
  });
  return o.length > 0;
}

User.prototype.hasGeneralInfo = async function() {
  return await this.hasData(GeneralInfo);
}

User.prototype.hasLocationInfo = async function() {
  return await this.hasData(LocationInfo);
}

User.prototype.hasEmergencyContact = async function() {
  return await this.hasData(EmergencyContact);
}

User.prototype.getData = async function(model) {
  let o = await model.getAllByFields({
    user: this.getKey()
  });
  return o[0];
}

User.prototype.getGeneralInfo = async function() {
  return await this.getData(GeneralInfo);
}

User.prototype.getLocationInfo = async function() {
  return await this.getData(LocationInfo);
}

User.prototype.getEmergencyContact = async function() {
  return await this.getData(EmergencyContact);
}

User.prototype.setData = async function(model, val) {
  let o = await model.getAllByFields({
    user: this.getKey()
  });
  val.user = this.getKey();
  if (o.length > 0) {
    o = o[0];
    await o.update(val);
  } else {
    o = await model.createByAutoKey(val);
  }
  return o;
}

User.prototype.setGeneralInfo = async function(params) {
  return await this.setData(GeneralInfo, {
    dateOfBirth: params.dateOfBirth,
    sex: params.sex,
    maritalStatus: params.maritalStatus,
    occupation: params.occupation
  });
}

User.prototype.setLocationInfo = async function(params) {
  return await this.setData(LocationInfo, {
    addressLine1: params.addressLine1,
    addressLine2: params.addressLine2,
    city: params.city,
    state: params.state,
    zipcode: params.zipcode
  });
}

// STATICS
User.exists = async key => await User.getKeysExist([key]);
User.notExists = async key => !(await User.exists(key));

User.hasGeneralInfo = async key => {
  let user = await User.getByKey(key);
  return await user.hasGeneralInfo();
}

User.hasLocationInfo = async key => {
  let user = await User.getByKey(key);
  return await user.hasLocationInfo();
}

Use.hasEmergencyContact = async key => {
  let user = await User.getByKey(key);
  return await user.hasEmergencyContact();
}

User.create = async params => {
  let imageUrl = await storage.upload(params.image);
  let authData = await auth.create(params.email, params.password);
  return await User.createByManualKey(authData.uid, {
    firstName: params.firstName,
    lastName: params.lastName,
    phoneNumber: params.phoneNumber,
    email: params.email,
    imageUrl: imageUrl
  });
}

// EXPORTS
module.exports = User;
