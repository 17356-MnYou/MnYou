import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Navbar from '../Navbar';
import Menu, { MenuProps } from './Menu';
import RestaurantForm from './MenuForm';
import QRCode from "react-qr-code";
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

  const handleMenuClick = async (menu_id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/menus/${menu_id}`);
      if (!response.ok) throw new Error('Failed to fetch menu details: ' + response.statusText);
      const menu_data = await response.json();
      console.log(menu_data);
      setMenus(menu_data);
  
      if (Array.isArray(menu_data.organizedItems)) {
        const convertedMenu = {
          ...menu_data,
          organizedItems: menu_data.organizedItems.map((section: any) => ({
            ...section,
            items: section.items.map((item: any) => ({
              ...item,
              price: parseFloat(item.price)
            }))
          }))
        };
        setSelectedMenu(convertedMenu);
      } else {
        console.error('menu_data.organizedItems is not an array:', menu_data.organizedItems);
      }
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

  const handleDelete = (menu_id: number) => async () => {
    // Ask for confirmation before deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this menu?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/api/restaurants/${menu_id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete menu: ' + response.statusText);
        // Update state to remove the menu from the list
        setMenus(menus.filter(menu => menu.id !== menu_id));
        alert("Menu deleted successfully."); // Optional: Notify user of success
      } catch (error: any) {
        console.error(error.message || 'Failed to delete menu');
        alert("Failed to delete menu."); // Optional: Notify user of failure
      }
    } else {
      // Optional: Handle the case where the user cancels the deletion
      console.log("Deletion cancelled by user.");
    }
  };

  return (
    <div>
      <Navbar />
      {selectedMenu ? (
        <div>
          <Menu {...selectedMenu} />
          <Button className="Button" onClick={() => setSelectedMenu(null)}>Back to list</Button>
        </div>
      ) : newMenu ? (
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
                <th>Delete</th>
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
                  <td>
                    <img
                      src="/trash.png"
                      width="60"
                      height="60"
                      alt="MnYou logo"
                      className="clickable-image"
                      onClick={handleDelete(menu.id)}
                    />
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