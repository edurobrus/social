import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyAaPppC8tW7hCOxukO3BL9BZs4-LR5l5LQ",
    authDomain: "farmeo-dbd64.firebaseapp.com",
    projectId: "farmeo-dbd64",
    storageBucket: "farmeo-dbd64.firebasestorage.app",
    messagingSenderId: "808054624580",
    appId: "1:808054624580:web:67be1341b6e361c9ad8711"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
