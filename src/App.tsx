import './App.css';
import React from "react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthContextProvider} from './components/context/AuthContext';
import Navbar from "./components/navbar";
import {Outlet} from 'react-router-dom';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Navbar/>
        <Outlet/>
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  );
}

export default App;
