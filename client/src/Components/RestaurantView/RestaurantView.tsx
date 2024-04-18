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

  const handleMenuClick = async (menu_id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/menus/${menu_id}`);
      if (!response.ok) throw new Error('Failed to fetch menu details: ' + response.statusText);
      const menu_data = await response.json();
      console.log(menu_data);
      setMenus(menu_data);

      const convertedMenu = {
        ...menu_data,
        menuItems: menu_data.menuItems.map((item: { price: string; }) => ({
          ...item,
          price: parseFloat(item.price)
        }))
      };
      setSelectedMenu(convertedMenu);
    } catch (error: any) {
      console.error(error.message || 'Failed to fetch menu details');
    }
  };  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewMenu(prevState => prevState ? { ...prevState, [name]: value } : null);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add the new menu to your backend when available
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
                    {/* <a href={menu.qrCodeLink || "#"} target="_blank" rel="noopener noreferrer">
                      View
                    </a> */}
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
          <Button className="Button">Add new menu</Button>
        </div>
      )}
    </div>
  );
};

export default RestaurantView;