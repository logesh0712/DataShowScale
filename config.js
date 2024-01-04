// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getStorage, ref} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC59wpoob1SqdeEHkn-yQgt1IqiPnazKjQ",
  authDomain: "cloudfunctions-27c66.firebaseapp.com",
  databaseURL: "https://cloudfunctions-27c66-default-rtdb.firebaseio.com",
  projectId: "cloudfunctions-27c66",
  storageBucket: "cloudfunctions-27c66.appspot.com",
  messagingSenderId: "997231762045",
  appId: "1:997231762045:web:228fbc6ac6c3291cc0af14"
};


// Initialize Firebase
//const app = initializeApp(firebaseConfig);
if (!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}

export const storage = getStorage();
export {firebase};
