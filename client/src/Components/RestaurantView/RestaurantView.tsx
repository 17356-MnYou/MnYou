import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Menu, { MenuProps } from './Menu';
import MenuForm from './MenuForm';
import './RestaurantView.css';

const RestaurantView: React.FC = () => {
  const [menus, setMenus] = useState<MenuProps[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<MenuProps | null>(null);
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

  const handleMenuClick = async (menu_id: any) => {
    try {
      const response = await fetch(`/api/menus/${menu_id}`);
      const menu_data = await response.json();

      const convertedMenu: MenuProps = {
        ...menu_data,
        menuItems: menu_data.menuItems.map((item: any) => ({
          ...item,
          price: parseFloat(item.price)
        }))
      };
      setSelectedMenu(convertedMenu);
    } catch (error) {
      console.error('Failed to fetch menu details:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewMenu(prevState => prevState ? { ...prevState, [name]: value } : null);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Submitting the form would typically involve a POST or PUT request here.
    console.log(newMenu);  // Use this to debug or replace with API call to save.
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
                <th>Id</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Username</th>
                <th>Password</th>
                <th>QR Code</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu.id} onClick={() => handleMenuClick(menu.id)}>
                  <td>{menu.id}</td>
                  <td>{menu.restaurantName}</td>
                  <td>{menu.address}</td>
                  <td>{menu.phoneNumber}</td>
                  <td>{menu.ownerUsername}</td>
                  <td>{menu.ownerPassword}</td>
                  {/* <td>
                    <a href={menu.qrCodeLink} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Button className="Button" onClick={handleAddMenuClick}>Add new menu</Button> */}
        </div>
      )}
    </div>
  );
};

export default RestaurantView;