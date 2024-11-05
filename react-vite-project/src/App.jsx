import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SideNav from './side-nav/SideNav';
import AESComponent from './AESComponent';
import LoginPage from './login-page/LoginPage';

const App = () => {
  return (
    // <BrowserRouter>
    //   <SideNav />
    // </BrowserRouter>
    // <AESComponent />
    <LoginPage />
  );
};

export default App;