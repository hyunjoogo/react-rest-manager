import React, {useEffect, useState} from 'react';
import {User} from "@firebase/auth";
import {login, logout, onUserStateChange} from "../api/firebase";
import UserComponent from './user';
import {Link} from 'react-router-dom';
import Button from "./ui/Button";


export interface UserState extends User {
  isAdmin?: boolean;
}

const Navbar = () => {
  const [user, setUser] = useState<UserState | null>(null);

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <h1>REST-Manager</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        {!!user && <UserComponent user={user}/>}
        {!user && <Button text="Login" onClick={login}/>}
        {!!user && <Button text="Logout" onClick={logout}/>}
      </nav>
    </header>
  );
};

export default Navbar;
