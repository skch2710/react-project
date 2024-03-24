import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Example components for your routes (replace with your actual components)
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import SideNav from './side-nav/SideNav';
import Counter from './increment-test/Counter';

const App = () => {
  return (
    <BrowserRouter>
      <SideNav />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/counter" element={<Counter />} />
      </Routes> */}
    </BrowserRouter>
  );
};

export default App;