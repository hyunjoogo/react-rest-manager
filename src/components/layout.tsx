import React, {ReactNode} from 'react';
import Navbar from "./navbar";

type LayoutComponent = {
  children: ReactNode
}
const Layout = ({children}: LayoutComponent) => {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  );
};

export default Layout;
