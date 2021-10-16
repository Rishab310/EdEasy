import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBHKe6kjEVSJgUT4zteg0Xu6Urdne_N8xs",
    authDomain: "edeasy-90583.firebaseapp.com",
    projectId: "edeasy-90583",
    storageBucket: "edeasy-90583.appspot.com",
    messagingSenderId: "273965515105",
    appId: "1:273965515105:web:e9365a82ec24d5c18fc520"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export default db;