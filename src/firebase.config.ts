import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyATLWK1n7_cjMpnfwdgPGKSfnXSYM8rqI4",
    authDomain: "digital-menu-app-5cd01.firebaseapp.com",
    projectId: "digital-menu-app-5cd01",
    storageBucket: "digital-menu-app-5cd01.appspot.com",
    messagingSenderId: "555789150324",
    appId: "1:555789150324:web:20fca5e38322ac6d910921",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(firebaseApp);
