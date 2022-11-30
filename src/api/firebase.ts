import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {get, getDatabase, ref, set, push, update, child, query, orderByChild} from "firebase/database";
import {User} from "@firebase/auth";
import {MyRestListType, MyRestType} from "../components/type/type";
import {limitToFirst} from "@firebase/database";
import {SelectedDateTypes} from "../pages/add-page";

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

// TODO onValue로 하는 방법 알아보기
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


export const getMyRest = async () => {
  // TODO userUid 파라미터로 받아오기
  const userUid = "61PnszykzXN643UrVfEaSQCDiEw1";
  return get(ref(database, `user/${userUid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return [];
    });
};

export const writeMyRest = async (data: MyRestListType) => {
  // TODO userUid 파라미터로 받아오기
  const userUid = "61PnszykzXN643UrVfEaSQCDiEw1";
  return update(ref(database, `user/${userUid}/myRestList`), data);
};

export const sortMyRest = async (selectedDate: SelectedDateTypes) => {
  const userUid = "61PnszykzXN643UrVfEaSQCDiEw1";
  get(ref(database, `user/${userUid}/restRemainDay`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return [];
    }).then(result => {
    const temp = {...result};
    Object.keys(selectedDate).forEach(value => {
      const day = selectedDate[value as keyof SelectedDateTypes]!;
      temp[day.category].remainDay -= day.deduction;
    });
    update(ref(database, `user/${userUid}/restRemainDay`), temp);
  });
};
