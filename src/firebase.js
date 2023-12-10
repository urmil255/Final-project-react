import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyBYAqwiHTEvAaDUnVVNsP4BaV20JSTl8vg",
    authDomain: "keeper-app-22f22.firebaseapp.com",
    projectId: "keeper-app-22f22",
    storageBucket: "keeper-app-22f22.appspot.com",
    messagingSenderId: "225680391795",
    appId: "1:225680391795:web:8fd07b02362db50724b406",
    measurementId: "G-NYSZGT4FRS"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { firestore,auth,database };


