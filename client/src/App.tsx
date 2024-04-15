import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerView from './Components/CustomerView/CustomerView';
import RestaurantView from './Components/RestaurantView/RestaurantView';
import Landing from './Components/Landing';
import MenuItemDetails from './Components/CustomerView/MenuItemDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="customer" element={<CustomerView />} />
          <Route path="/menuItem/:menuItemId" element={<MenuItemDetails />} />
          <Route path="restaurant" element={<RestaurantView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
