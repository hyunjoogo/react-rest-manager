import './App.css';
import {Route, Routes} from 'react-router-dom';

import React, {lazy} from "react";

const MyRest = lazy(() => import('../src/view/my-rest'));
const Layout = lazy(() => import('./components/layout'));

function App() {


  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MyRest/>}>
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
