import * as firebase from "firebase";

const firebaseConfig = {
    authDomain: "chamatodo.firebaseapp.com",
    databaseURL: "https://chamatodo.firebaseio.com",
    projectId: "chamatodo",
    storageBucket: "chamatodo.appspot.com",
    messagingSenderId: "1016493587886"
};

firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos");
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();