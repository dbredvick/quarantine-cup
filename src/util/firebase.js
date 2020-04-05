import * as firebase from "firebase/app";
import "firebase/auth";

// Make sure it hasn't already been initialized
if (!firebase.apps.length) {
  // Replace with your own Firebase credentials
  firebase.initializeApp({
    apiKey: "AIzaSyBx6-qxURavcQWMkiFnQbTyzqUC0brRk4U",
    authDomain: "quarantine-cup-44312.firebaseapp.com",
    databaseURL: "https://quarantine-cup-44312.firebaseio.com",
    projectId: "quarantine-cup-44312",
    storageBucket: "quarantine-cup-44312.appspot.com",
    messagingSenderId: "331745277845",
    appId: "1:331745277845:web:c40fdad95f92849a0c689c",
    measurementId: "G-8LGP4S69WD",
  });
}

export default firebase;
