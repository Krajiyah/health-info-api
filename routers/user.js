// DEPENDENCIES
const router = require("express").Router();
const routerUtil = require("../util/router.js");
const User = require("../models/User.js");
const multer = require("multer");

// CONSTANTS
const upload = multer({
  dest: '/tmp/'
});

// ROUTES
router.get("/users/:key?", (req, res) => {
  req.checkQuery("key", routerUtil.errors.missingErrorMessage).notEmpty();
  req.checkQuery("key", routerUtil.errors.dbErrorMessage)
    .isAsyncFnTrue(User.exists);
  routerUtil.completeRequest(req, res, async params => {
    return await User.getByKey(params.key);
  });
});

router.post("/users", upload.single('image'), (req, res) => {
  req.body.image = req.file;
  req.checkBody("key", routerUtil.errors.missingErrorMessage).notEmpty();
  req.checkBody("key", "user already exists").isAsyncFnTrue(User.notExists);
  req.checkBody("image", router.errors.missingErrorMessage).notEmpty();
  req.checkBody("image", router.errors.formatErrorMessage).isValidFile();
  req.checkBody("firstName", routerUtil.errors.missingErrorMessage).notEmpty();
  req.checkBody("lastName", routerUtil.errors.missingErrorMessage).notEmpty();
  req.checkBody("phoneNumber", routerUtil.errors.missingErrorMessage).notEmpty();
  req.checkBody("email", routerUtil.errors.missingErrorMessage).notEmpty();
  routerUtil.completeRequest(req, res, User.create);
});

// EXPORTS
module.exports = router;
