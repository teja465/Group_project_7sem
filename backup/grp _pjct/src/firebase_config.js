import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {                         // BrohGram/insta_clone proej config
  apiKey: "AIzaSyDK_0Jr3PvTiZOMS8C_eLefaiwSn9R7et0",
  authDomain: "fir-js-554c2.firebaseapp.com",
  databaseURL: "https://fir-js-554c2.firebaseio.com",
  projectId: "fir-js-554c2",
  storageBucket: "fir-js-554c2.appspot.com",
  messagingSenderId: "21054683264",
  appId: "1:21054683264:web:70b82f477f406e92150e65",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// export const firebase=firebase();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage=firebase.storage();
