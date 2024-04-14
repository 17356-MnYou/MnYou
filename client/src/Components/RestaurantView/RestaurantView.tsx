import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Menu, { MenuProps } from './Menu';
import MenuForm from './MenuForm';
import './RestaurantView.css';
import menus from './menus.json';

const RestaurantView: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuProps | null>(null);
  const [newMenu, setNewMenu] = useState<MenuProps | null>(null);

  const handleMenuClick = (menu: any) => {
    const convertedMenu: MenuProps = {
      ...menu,
      menuItems: menu.menuItems.map((item: any) => ({
        ...item,
        price: parseFloat(item.price)
      }))
    };
    setSelectedMenu(convertedMenu);
  };

  const handleAddMenuClick = () => {
    setNewMenu({
      id: menus.length + 1, // Generate a new ID when connect to backend
      restaurantName: '',
      restaurantDescription: '',
      address: '',
      phoneNumber: '',
      menuName: '',
      menuDescription: '',
      menuItems: [],
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewMenu(prevState => prevState ? { ...prevState, [name]: value } : null);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add the new menu to your backend when available
    console.log(newMenu);
    setNewMenu(null);
  };

  return (
    <div>
      {selectedMenu ? (
        <div>
          <Menu {...selectedMenu} />
          <Button className="Button" onClick={() => setSelectedMenu(null)}>Back to list</Button>
        </div>
      ) : newMenu ? (
        <MenuForm newMenu={newMenu} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} setNewMenu={setNewMenu} />
      ) : (
        <div>
          <Table className="Table" striped bordered hover>
            <thead>
              <tr>
                <th>Restaurant Name</th>
                <th>Restaurant Description</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Menu Name</th>
                <th>Menu Description</th>
                <th>QR Code</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu.id} onClick={() => handleMenuClick(menu)}>
                  <td>{menu.restaurantName}</td>
                  <td>{menu.restaurantDescription}</td>
                  <td>{menu.address}</td>
                  <td>{menu.phoneNumber}</td>
                  <td>{menu.menuName}</td>
                  <td>{menu.menuDescription}</td>
                  <td>
                    <a href={menu.qrCodeLink} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button className="Button" onClick={handleAddMenuClick}>Add new menu</Button>
        </div>
      )}
    </div>
  );
};

export default RestaurantView;