import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerView from './Components/CustomerView/CustomerView';
import RestaurantView from './Components/RestaurantView/RestaurantView';
import Landing from './Components/Landing';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="customer" element={<CustomerView />} />
          <Route path="restaurant" element={<RestaurantView />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;