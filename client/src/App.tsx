import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerView from './Components/CustomerView/CustomerView';
import RestaurantView from './Components/RestaurantView/RestaurantView';
import MenuDetails from './Components/RestaurantView/MenuDetails';
import Landing from './Components/Landing';
import MenuItemDetails from './Components/CustomerView/MenuItemDetails';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import './Components/Navbar.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="customer" element={<CustomerView />} />
          <Route path="/menuItem/:menuItemId" element={<MenuItemDetails />} />
          <Route path="restaurant" element={<RestaurantView />} />
          <Route path="restaurant/:menu_id" element={<MenuDetails />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;