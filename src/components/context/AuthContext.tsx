import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {getAuth, User} from "firebase/auth";
import {login, logout, onUserStateChange} from "../../api/firebase";
import {UserState} from "../navbar";

export type Store = {
  user: UserState | null;
  login: () => void;
  logout: () => void;
  setUser :  React.Dispatch<React.SetStateAction<User | null>>;
  isModalOpen : boolean;
  setIsModalOpen :  React.Dispatch<React.SetStateAction<boolean>>;
}

type AuthContextProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<Store | null>(null);

export function AuthContextProvider({children}: AuthContextProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onUserStateChange((user: User | null) => {
      setUser(user);
    });
  }, []);

  const store: Store = {
    user, login, logout, setUser, isModalOpen, setIsModalOpen
  };

  return (
    <AuthContext.Provider value={store}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
