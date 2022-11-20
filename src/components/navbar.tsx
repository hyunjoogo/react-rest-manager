import React, {useEffect, useState} from 'react';
import {User} from "@firebase/auth";
import {login, logout, onUserStateChange} from "../api/firebase";
import UserComponent from './user';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [user, setUser] = useState<User | void | null>(null);

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <h1>REST-Manager</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        {!!user && <UserComponent user={user} />}
        {!user && <button onClick={login}>Login</button>}
        {!!user && <button onClick={logout}>Logout</button>}
      </nav>
    </header>
  );
};

export default Navbar;
