import React, { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import CustomerView from '../CustomerView/CustomerView';
import './Menu.css';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface MenuProps {
  id: number;
  restaurantName: string;
  restaurantDescription: string;
  address: string;
  phoneNumber: string;
  menuName: string;
  menuDescription: string;
  menuItems: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({
  id,
  restaurantName,
  restaurantDescription,
  address,
  phoneNumber,
  menuName,
  menuDescription,
  menuItems,
}) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [editedMenuItem, setEditedMenuItem] = useState<MenuItem | null>(null);

  const handleEditClick = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    // Initialize the form with the current menu item
    setEditedMenuItem(menuItem);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedMenuItem(prevState => prevState ? { ...prevState, [name]: value } : null);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Update the menu item in backend when available
    setSelectedMenuItem(null);
    setEditedMenuItem(null);
  };

  const handleAddClick = () => {
    setSelectedMenuItem(null);
    setEditedMenuItem({ id: 0, name: '', description: '', image: '', price: 0 });
  };

  return (
    <div className="Menu">
      <h2>{restaurantName}</h2>
      <p>{restaurantDescription}</p>
      <p>{address}</p>
      <p>{phoneNumber}</p>
      <h3>{menuName}</h3>
      <p>{menuDescription}</p>
      <Button className="Button" onClick={handleAddClick}>Add New Item</Button>
      {selectedMenuItem || editedMenuItem ? (
        <div>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={editedMenuItem?.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={editedMenuItem?.description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" name="image" value={editedMenuItem?.image} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={editedMenuItem?.price} onChange={handleInputChange} />
            </Form.Group>
            <Button className="Button" type="submit">Save</Button>
            <Button className="Button" onClick={() => { setSelectedMenuItem(null); setEditedMenuItem(null); }}>Cancel</Button>
          </Form>
        </div>
      ) : (
        <Table className="Table" striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((menuItem) => (
              <tr key={menuItem.id}>
                <td>{menuItem.name}</td>
                <td>{menuItem.description}</td>
                <td><img src={menuItem.image} alt={menuItem.name} /></td>
                <td>{menuItem.price}</td>
                <td><Button className="Button" onClick={() => handleEditClick(menuItem)}>Edit</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <div className="small-view">
        <CustomerView />
      </div>
    </div>
  );
};

export default Menu;