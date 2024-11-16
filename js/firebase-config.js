const firebaseConfig = {
    apiKey: "AIzaSyCfmhaoPPr2IndawoxAaBxivLfkIkaGr38",
    authDomain: "tugas-02-pawm.firebaseapp.com",
    databaseURL: "https://tugas-02-pawm-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tugas-02-pawm",
    storageBucket: "tugas-02-pawm.firebasestorage.app",
    messagingSenderId: "903272020207",
    appId: "1:903272020207:web:af13e6e84c84df1648431a"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
