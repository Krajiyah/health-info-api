// DEPENDENCIES
const router = require("express").Router();
const routerUtil = require("../util/router.js");
const Appointment = require("../models/Appointment.js");

router.get("/appointments/:key?", (req, res) => {
  req.checkQuery("key", routerUtil.errors.missingErrorMessage).notEmpty();
  req.checkQuery("key", routerUtil.errors.dbErrorMessage)
    .isAsyncFnTrue(Appointment.exists);
  routerUtil.completeRequest(req, res, async params => {
    return await Appointment.getByKey(params.key);
  });
});

// EXPORTS
module.exports = router;
