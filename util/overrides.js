// PROTOTYPES
Array.prototype.forEachAsync = async function(cb) {
  for (let i = 0; i < this.length; i++) {
    let ele = this[i];
    await cb(ele, i);
  }
}

Array.prototype.mapAsync = async function(cb) {
  var result = [];
  for (let i = 0; i < this.length; i++) {
    let ele = this[i];
    let newEle = await cb(ele, i);
    result.push(newEle);
  }
  return result;
}

Array.prototype.filterAsync = async function(cb) {
  var result = [];
  for (let i = 0; i < this.length; i++) {
    let ele = this[i];
    let bool = await cb(ele, i);
    if (bool === true)
      result.push(ele);
  }
  return result;
}

Array.prototype.reduceAsync = async function(cb, initVal) {
  var result = initVal;
  for (let i = 0; i < this.length; i++) {
    let ele = this[i];
    result = await cb(result, ele);
  }
  return result;
}

module.exports.Array = Array;
