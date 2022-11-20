import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite';
import {User} from "@firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);


export const login = () => {
  signInWithPopup(auth, provider).catch(console.error);
};

export function logout() {
  signOut(auth).catch(console.error);
}

export const onUserStateChange = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, callback);
};

