import firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyAUNoXm-lyhy07QDFFe7FMKRe-boTy4gfs",
  authDomain: "storage-management-33cc6.firebaseapp.com",
  databaseURL: "https://storage-management-33cc6-default-rtdb.firebaseio.com",
  projectId: "storage-management-33cc6",
  storageBucket: "storage-management-33cc6.appspot.com",
  messagingSenderId: "73906943058",
  appId: "1:73906943058:web:c63a4327a4308acf4f1b8b",
  measurementId: "G-YQERNKS11M"
};

export const firebaseImpl = firebase.initializeApp(config);
export const database = firebase.database();
