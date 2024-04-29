import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { MenuProps } from './Menu';
import RestaurantForm from './MenuForm';
import QRCode from "react-qr-code";
import './RestaurantView.css';

const RestaurantView: React.FC = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<MenuProps[]>([]);
  const [newMenu, setNewMenu] = useState<MenuProps | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/restaurants');
        const data = await response.json();
        console.log(data);
        setMenus(data);
      } catch (error) {
        console.error('Failed to fetch menus:', error);
      }
    };
    fetchMenus();
  }, []);

  const handleAddMenuClick = () => {
    setNewMenu({
      id: menus.length + 1,
      username: 'example@gmail.com',
      password: 'secret',
      name: '',
      address: '',
      phoneNumber: '',
      primaryFont: '',
      secondaryFont: '',
      primaryFontColor: '',
      secondaryFontColor: '',
      backgroundColor: '',
      orientation: 0,
      organizedItems: [],
    });
  };

  const handleMenuClick = (menu_id: number) => {
    navigate(`/restaurant/${menu_id}`);
  };

  return (
    <div>
      <Navbar />
      {newMenu ? (
        <RestaurantForm/>
      ) : (
        <div>
          <Table className="Table" striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Username</th>
                <th>Password</th>
                <th>QR Code</th>
                <th>View Menu</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu.id}>  {/* Ensure a unique key for each row */}
                  <td>{menu.id}</td>
                  <td>{menu.name}</td>
                  <td>{menu.address}</td>
                  <td>{menu.phoneNumber}</td>
                  <td>{menu.username}</td>
                  <td>{menu.password}</td>
                  <td>
                      <QRCode
                        id={'qr' + menu.id}
                        value={'http://localhost:3000/restaurant/' + menu.id}
                        size={128}
                        level={'H'}
                      />
                  </td>
                  <td>
                    <Button className="view-menu-button" onClick={() => handleMenuClick(menu.id)}>
                      View Menu
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button className="Button" onClick={handleAddMenuClick}>Add New Restaurant</Button>
        </div>
      )}
    </div>
  );
};

export default RestaurantView;