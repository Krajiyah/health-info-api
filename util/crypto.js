const crypto = require('crypto');
const algorithm = 'aes-256-ctr';

var encrypt = (text, password) => {
  let cipher = crypto.createCipher(algorithm, password);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

var decrypt = (text, password) => {
  let decipher = crypto.createDecipher(algorithm, password)
  var dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8');
  return dec;
}

var encryptData = (data, fields, password) => {
  fields.forEach(field => {
      data[field] = encrypt(data[field], password));
  });
}

var decryptData = (data, fields, password) => {
  fields.forEach(field => {
      data[field] = decrypt(data[field], password));
  });
}

module.exports.encrypt = encrypt;
module.exports.encryptData = encryptData;
module.exports.decrypt = decrypt;
module.exports.decryptData = decryptData;
