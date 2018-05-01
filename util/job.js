// DEPENDENCIES
const time = require("./time.js");

// METHODS
var run = async(fn, initLabel, successLabel) => {
  let start = new Date();
  console.log(initLabel);
  try {
    await fn();
    console.log("Success: ", successLabel);
  } catch (e) {
    console.error("Error: ", error);
  }
  let seconds = time.secondsApart(start, new Date());
  console.log("Elapsed Time: ", seconds, "seconds");
}

// EXPORTS
module.exports.run = run;
