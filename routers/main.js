// DEPENDENCIES
const router = require("express").Router();
const subRouters = [
  "./user.js"
];

// ROUTES
subRouters.forEach(subRoute => {
  router.use(require(subRoute));
});

// EXPORTS
module.exports = router;
