import { getConfig } from "@testing-library/react";
import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase';
import 'firebase/firestore';
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-gIE_Yf2TiDECYnynf9UpJkY6IFJ2pZw",
  authDomain: "fir-9d3e5.firebaseapp.com",
  projectId: "fir-9d3e5",
  storageBucket: "fir-9d3e5.appspot.com",
  messagingSenderId: "139502961917",
  appId: "1:139502961917:web:3d37d115ea8d16c739aa94",
  measurementId: "G-KX5BB2BB75"
};

  export default firebase.initializeApp(firebaseConfig)