// CONSTANTS
const errors = {
  formatErrorMessage: "Invalid param format",
  missingErrorMessage: "Missing or empty param",
  dbErrorMessage: "Object with key does not exist"
};

// HELPERS
let _getBaseClass = targetClass => {
  if (targetClass instanceof Function) {
    let baseClass = targetClass;

    while (baseClass) {
      const newBaseClass = Object.getPrototypeOf(baseClass);

      if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
        baseClass = newBaseClass;
      } else {
        break;
      }
    }

    return baseClass;
  }
}

let _isFirebaseObject = (obj) => {
  return _getBaseClass(obj.constructor).name == "FirebaseObject";
}

let _sendRes = (res, status, obj) => {
  if (typeof(obj) != "object") {
    res.status(status).send(obj);
    return;
  }
  if (Array.isArray(obj) && obj.length > 0 && _isFirebaseObject(obj[0]))
    obj = obj[0].constructor.jsonAll(obj);
  else if (_isFirebaseObject(obj))
    obj = obj.json();
  res.status(status).json(obj);
}

// HELPERS
let _aggregateParams = req => {
  var allParams = {};

  let helper = field => {
    for (var key in req[field]) {
      if (req[field][key] != null) {
        allParams[key] = req[field][key];
      }
    }
  }

  helper("query");
  helper("body");
  helper("params");
  helper("cookies");
  return allParams;
}

// METHODS
var completeRequest = async(req, res, func) => {
  let result;
  try {
    result = await req.getValidationResult();
  } catch (e) {
    _sendRes(res, 400, e.message);
    return;
  }
  if (!result.isEmpty()) {
    _sendRes(res, 400, result.array());
    return;
  }
  try {
    let value = await func(_aggregateParams(req));
    _sendRes(res, 200, value);
  } catch (e) {
    console.error(e);
    _sendRes(res, 500, e.message);
  }
}

var rejectRequest = (req, res) => {
  completeRequest(req, res, params => {
    throw new Error("Could not clasify your request.");
  });
}

// EXPORTS
module.exports.errors = errors;
module.exports.completeRequest = completeRequest;
module.exports.rejectRequest = rejectRequest;
