import './App.css';
import React from "react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthContextProvider} from './components/context/AuthContext';
import {Outlet} from 'react-router-dom';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import DialogManager from './dialog/DialogManager';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Outlet/>
        <DialogManager/>
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  );
}

export default App;
