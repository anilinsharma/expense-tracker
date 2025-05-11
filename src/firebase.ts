// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBwNzDCcMqNyIo-JYziKy3oTaiRk7gzdu8",
    authDomain: "expensetracker-a9029.firebaseapp.com",
    projectId: "expensetracker-a9029",
    storageBucket: "expensetracker-a9029.firebasestorage.app",
    messagingSenderId: "795748726287",
    appId: "1:795748726287:web:951da454fc6064c430157a",
    measurementId: "G-8B86W52N5P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
