import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SideNav from './side-nav/SideNav';
import AESComponent from './AESComponent';

const App = () => {
  return (
    // <BrowserRouter>
    //   <SideNav />
    // </BrowserRouter>
    <AESComponent />
  );
};

export default App;