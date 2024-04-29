import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerView from './Components/CustomerView/CustomerView';
import RestaurantView from './Components/RestaurantView/RestaurantView';
import Landing from './Components/Landing';
import MenuItemDetails from './Components/CustomerView/MenuItemDetails';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import './Components/Navbar.css';

function App() {
  const [storeStyle, setStoreStyle] = useState({
    primaryFont: '',
    secondaryFont: '',
    primaryFontColor: '',
    secondaryFontColor: '',
    backgroundColor: ''
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/menus/1')
         .then((response) => response.json())
         .then((data) => {
            setStoreStyle({
              primaryFont: data.primaryFont,
              secondaryFont: data.secondaryFont,
              primaryFontColor: data.primaryFontColor,
              secondaryFontColor: data.secondaryFontColor,
              backgroundColor: data.backgroundColor
            });
         })
         .catch((err) => {
            console.log(err.message);
         });
  }, []);
  
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="customer" element={<CustomerView />} />
          <Route path="/menuItem/:menuItemId" element={<MenuItemDetails style={storeStyle}/>} />
          <Route path="restaurant" element={<RestaurantView />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;