import './App.css';
import React from "react";
import {AuthContextProvider} from './components/context/AuthContext';
import Navbar from "./components/navbar";
import {Outlet} from 'react-router-dom';

function App() {
  return (
    <AuthContextProvider>
      <Navbar/>
      <Outlet/>
    </AuthContextProvider>
  );
}

export default App;
