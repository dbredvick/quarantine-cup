const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../../../quarantine-cup-service-acc.json");

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });
}

module.exports = firebaseAdmin;
