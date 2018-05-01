// DEPENDENCIES
const router = require("express").Router();
const routerUtil = require("../util/router.js");
const Appointment = require("../models/Appointment.js");
const User = require("../models/User.js");

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
  req.checkBody("name", routerUtil.errors.missingErrorMessage).notEmpty();
  req.checkBody("time", routerUtil.errors.missingErrorMessage).notEmpty();
  req.checkBody("time", routerUtil.errors.missingErrorMessage).isValidInteger();
  routerUtil.completeRequest(req, res, async params => {
    return await Appointment.createByAutoKey({
      user: params.user,
      name: params.name,
      time: params.time
    });
  });
});

// EXPORTS
module.exports = router;
