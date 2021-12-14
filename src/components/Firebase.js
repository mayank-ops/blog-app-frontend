// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
// import "firebase/compat/storage"
// import "firebase/compat/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7T_u29F8MFlK4C-8GEbGt4sjAlLxQH0Y",
    authDomain: "blog-app-29fea.firebaseapp.com",
    projectId: "blog-app-29fea",
    storageBucket: "blog-app-29fea.appspot.com",
    messagingSenderId: "917373154672",
    appId: "1:917373154672:web:5e265aa2ad0f46fdeccbb5"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }