// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, browserSessionPersistence, setPersistence } from "firebase/auth";
 
import {getStorage, ref, uploadBytes} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyBxORxZQkjx7TTd-jqqKu1p5UlfDXRUY",
  authDomain: "ferterliser-distribution.firebaseapp.com",
  projectId: "ferterliser-distribution",
  storageBucket: "ferterliser-distribution.appspot.com",
  messagingSenderId: "420198454131",
  appId: "1:420198454131:web:c387efe1a29fbd80b3eb06",
  measurementId: "G-JLYRP7PE8L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore(app);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);
export {auth, app};
export { db };

//storage
export async function upload( file, user, setLoading, updateProfile ) {
  const fileRef = ref(storage, `${user.uid}/profile.png`);

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  updateProfile();

  setLoading(false);
  alert('Uploaded file!');

  
}