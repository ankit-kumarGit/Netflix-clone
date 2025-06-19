// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { useId } from "react";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBWmL0Q61C0Jp74wRO4lBUa0WAV8NSJn0",
  authDomain: "netflix-clone-70590.firebaseapp.com",
  projectId: "netflix-clone-70590",
  storageBucket: "netflix-clone-70590.firebasestorage.app",
  messagingSenderId: "991735249957",
  appId: "1:991735249957:web:aa811474aeea91b82813cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth= getAuth(app);
const db= getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res= await createUserWithEmailAndPassword(auth, email, password);
        const user= res.user;

        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,

        });
    } catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const login = async (email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout= ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};