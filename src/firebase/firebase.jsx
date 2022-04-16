import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgtnBEZsGeQxsojvyvL8PSGvynm4gONG4",
  authDomain: "movie-web-react-8cd74.firebaseapp.com",
  projectId: "movie-web-react-8cd74",
  storageBucket: "movie-web-react-8cd74.appspot.com",
  messagingSenderId: "399491131412",
  appId: "1:399491131412:web:a77730b7bee27113f2df01",
  measurementId: "G-6R760FSC6S",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
