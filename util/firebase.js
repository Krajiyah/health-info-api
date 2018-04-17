// DEPENDENCIES
const firebase = require("firebase-admin");
const firebaseUtil = require("firebase-admin-util");
const schema = require("../schema.json");

// INITIALIZE
firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.FIREBASE_DB_URL,
  storageBucket: process.env.FIREBASE_STORAGE_URL
});

// OBJECT
var myFb = firebaseUtil(firebase, schema);

if (process.env.STAGE == "TEST") {
  let getUids = (token) => {
    return firebase.auth().listUsers(1000, token).then(function(res) {
      let uids = res.users.map(x => x.uid);
      if (!res.pageToken) return uids;
      return getUids(res.pageToken).then(uList => uList.concat(uids));
    });
  }

  let clearAllUsers = () => {
    return getUids().then(uids => {
      return Promise.all(uids.map(uid => firebase.auth().deleteUser(uid)));
    });
  }

  let deleteFile = (name) => {
    return firebase.storage().bucket().file(name).delete();
  }

  let clearAllFiles = () => {
    return firebase.storage().bucket().getFiles().then(files => {
      return Promise.all(files[0].map(file => deleteFile(file.name)));
    });
  }

  myFb.clearAll = () => {
    return Promise.all([
      firebase.database().ref().remove(),
      clearAllFiles(),
      clearAllUsers()
    ]);
  }

  Object.keys(myFb.fcm).forEach(methodName => {
    let origMethod = myFb.fcm[methodName].bind({});
    myFb.fcm[methodName] = (...params) => {
      if (process.env.STAGE == "TEST") return Promise.resolve();
      return origMethod(...params);
    }
  });
}

// EXPORTS
module.exports = myFb;
