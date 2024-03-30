import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SideNav from './side-nav/SideNav';

const App = () => {
  return (
    <BrowserRouter>
      <SideNav />
    </BrowserRouter>
  );
};

export default App;