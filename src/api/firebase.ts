import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {get, getDatabase, ref} from "firebase/database";
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
const database = getDatabase(app);


export const login = () => {
  signInWithPopup(auth, provider).catch(console.error);
};

export function logout() {
  signOut(auth).catch(console.error);
}


export const onUserStateChange = (callback: any) => {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser: any = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
};


const adminUser = async (user: User | null) => {
  // 2. 사용자가 어드민 권한을 가지고 있는지 확인!
  // 3. {...user, isAdmin : true/false}
  return get(ref(database, 'admins'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin: boolean = admins.includes(user?.uid);
        return {...user, isAdmin};
      }
      return user;
    }).catch((error) => {
      console.error(error);
    });
};

export async function getMyRestList() {
  const userUid = "61PnszykzXN643UrVfEaSQCDiEw1";
  return get(ref(database, `user/${userUid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().myRestList;
      }
      return [];
    });
}

