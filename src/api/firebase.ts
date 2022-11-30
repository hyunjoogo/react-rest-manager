import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {get, getDatabase, ref, set, push, update, child} from "firebase/database";
import {User} from "@firebase/auth";
import {MyRestListType, MyRestType} from "../components/type/type";

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

export const getMyRest = async () => {
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
  const userUid = "61PnszykzXN643UrVfEaSQCDiEw1";

  // 기존데이터가 있는지 없는지 확인해야해
  console.log(data);

  const postData = {
    "20221108": [
      {
        "category": "takeoff",
        "createDt" : "",
        "date" : "2002-11-08",
        "deduction": 1,
        "privateReason" : "개인메모2",
        "publicReaston" : "공적내용",
        "useType": "tmo",
      },
    ],
    "20221109": [
      {
        "category": "takeoff",
        "createDt" : "",
        "date" : "2002-11-09",
        "deduction": 1,
        "privateReason" : "개인메모",
        "publicReaston" : "공적내용",
        "useType": "tmo",
      },
    ]
  }

  const updates = {};
  // @ts-ignore
  updates[`user/${userUid}/myRestList`] = data;


  return update(ref(database, `user/${userUid}/myRestList`), data);

  // return update(ref(database, `users/${userUid}`), {
  //   user: "test"
  // });
};

