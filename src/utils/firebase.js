// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqfvnsGgR_fBjiz59j9JiiA0TTlBeOaXw",
    authDomain: "budget-app-react-3f8a6.firebaseapp.com",
    projectId: "budget-app-react-3f8a6",
    storageBucket: "budget-app-react-3f8a6.appspot.com",
    messagingSenderId: "787937259454",
    appId: "1:787937259454:web:2ef3c78ecc104856c413ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
