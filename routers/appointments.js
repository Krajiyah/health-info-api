// DEPENDENCIES
const router = require("express").Router();
const routerUtil = require("../util/router.js");
const Appointment = require("../models/Appointment.js");
const User = require("../models/User.js");
const Institution = require("../models/Institution.js");

router.get("/appointments/:key?", (req, res) => {
  req.checkQuery("key", routerUtil.errors.missingErrorMessage).notEmpty();
  req.checkQuery("key", routerUtil.errors.dbErrorMessage)
    .isAsyncFnTrue(Appointment.exists);
  routerUtil.completeRequest(req, res, async params => {
    return await Appointment.getByKey(params.key);
  });
});

router.post("/appointments", (req, res) => {
  req.checkBody("user", routerUtil.errors.missingErrorMessage).notEmpty();
  req.checkBody("user", routerUtil.errors.dbErrorMessage)
    .isAsyncFnTrue(User.exists);
  req.checkBody("institution", routerUtil.errors.missingErrorMessage).notEmpty();
  req.checkBody("institution", routerUtil.errors.dbErrorMessage)
    .isAsyncFnTrue(Institution.exists);
  req.checkBody("name", routerUtil.errors.missingErrorMessage).notEmpty();
  req.checkBody("time", routerUtil.errors.missingErrorMessage).notEmpty();
  req.checkBody("time", routerUtil.errors.missingErrorMessage).isValidInteger();
  routerUtil.completeRequest(req, res, Appointment.create);
});

router.patch("/appointments/:key", (req, res) => {
  req.checkParams("key", routerUtil.errors.missingErrorMessage).notEmpty();
  req.checkParams("key", routerUtil.errors.dbErrorMessage)
    .isAsyncFnTrue(Appointment.exists);
  routerUtil.completeRequest(req, res, async params => {
    let a = await Appointment.getByKey(params.key);
    await a.signIn();
    return a;
  });
});

// EXPORTS
module.exports = router;
