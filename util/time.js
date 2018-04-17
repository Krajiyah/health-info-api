// DEPENDENCIES
const moment = require("moment");

// METHODS
var secondsApart = (dStart, dEnd) => {
  return moment(dEnd).diff(moment(dStart), 'seconds');
}

var getUnixTS = () => new Date().getTime();

// EXPORTS
module.exports.getUnixTS = getUnixTS;
module.exports.secondsApart = secondsApart;
