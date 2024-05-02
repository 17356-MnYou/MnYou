import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerView from './Components/CustomerView/CustomerView';
import RestaurantView from './Components/RestaurantView/RestaurantView';
import MenuDetails from './Components/RestaurantView/MenuDetails';
import Landing from './Components/Landing';
import { useParams } from 'react-router-dom';
import MenuItemDetails from './Components/CustomerView/MenuItemDetails';
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
  const { menuId } = useParams();
  useEffect(() => {
    fetch(`${process.env.API_ENDPOINT}/menus/${menuId}`)
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
  }, [menuId]);

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="customer/:menuId" element={<CustomerView />} />
          <Route path="/menuItem/:menuItemId" element={<MenuItemDetails style={storeStyle} />} />
          <Route path="restaurant" element={<RestaurantView />} />
          <Route path="restaurant/:menuId" element={<MenuDetails />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
