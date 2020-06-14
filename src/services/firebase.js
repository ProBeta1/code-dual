import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDKtQz5RXBdke_IzfVMQzPjsMwoMkLxFGs",
  authDomain: "codepraxis-3d053.firebaseapp.com",
  databaseURL: "https://codepraxis-3d053.firebaseio.com",
  projectId: "codepraxis-3d053",
  storageBucket: "codepraxis-3d053.appspot.com",
  messagingSenderId: "431252934048",
  appId: "1:431252934048:web:f7612e32e03a04e754a8c5",
  measurementId: "G-WD0YTZ10D4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth;
export const db = firebase.database();