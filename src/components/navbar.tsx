import React, {useEffect, useState} from 'react';
import {User} from "@firebase/auth";
import {login, logout, onUserStateChange} from "../api/firebase";
import {getAuth} from "firebase/auth";


const Navbar = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | void | null>(null);

  useEffect(() => {
    onUserStateChange((user : User | null) => setUser(user))
  }, []);

  const handleLogin = () => {
    login().then(setUser);
  };
  const handleLogout = () => {
    logout().then(setUser);
  };
  return (
    <div>
      {user === null && <button onClick={handleLogin}>로그인</button>}
      {!!user && <button onClick={handleLogout}>로그아웃</button>}
    </div>
  );
};

export default Navbar;
