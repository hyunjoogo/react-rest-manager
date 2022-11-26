import './App.css';
import React from "react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthContextProvider} from './components/context/AuthContext';
import {Outlet} from 'react-router-dom';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import DialogManager from './dialog/DialogManager';
import Navbar from './components/ui/navbar';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {/*<Navbar/>*/}
        <Outlet/>
        <DialogManager/>
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  );
}

export default App;
