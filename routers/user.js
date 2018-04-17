// DEPENDENCIES
const router = require("express").Router();
const routerUtil = require("../util/router.js");
const User = require("../models/User.js");

// ROUTES
router.get("/users/:key?", (req, res) => {
  req.checkQuery("key", routerUtil.errors.missingErrorMessage).notEmpty();
  req.checkQuery("key", routerUtil.errors.dbErrorMessage)
    .isAsyncFnTrue(User.exists);
  routerUtil.completeRequest(req, res, async params => {
    return await User.getByKey(params.key);
  });
});

// EXPORTS
module.exports = router;
