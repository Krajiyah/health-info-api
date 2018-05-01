// DEPENDENCIES
const router = require("express").Router();
const routerUtil = require("../util/router.js");
const Institution = require("../models/Institution.js");

router.get("/institutions", (req, res) => {
  routerUtil.completeRequest(req, res, async params => {
    return await Institution.getAll();
  });
});

// EXPORTS
module.exports = router;
