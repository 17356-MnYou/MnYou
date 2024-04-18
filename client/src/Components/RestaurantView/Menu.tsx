import React, { useState, useEffect } from 'react';
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
  name: string;
  address: string;
  phoneNumber: string;
  username: string;
  password: string;
}

const Menu: React.FC<MenuProps> = ({
  id,
  name,
  address,
  phoneNumber,
  username,
  password,
}) => {
  const [editedMenuItem, setEditedMenuItem] = useState<MenuItem | null>(null);

  const handleEditClick = (menuItem: MenuItem) => {
    setEditedMenuItem(menuItem);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedMenuItem(prevState => ({
      ...prevState!,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submit:', editedMenuItem);
    // Placeholder for backend update logic
    setEditedMenuItem(null);
  };

  const handleCancel = () => {
    setEditedMenuItem(null);
  };

  const handleAddClick = () => {
    const newItem = { id: Date.now(), name: '', description: '', image: '', price: 0 };
    setEditedMenuItem(newItem);
  };

  return (
    <div className="Menu">
      <h2>{name}</h2>
      <p>{address}</p>
      <p>{phoneNumber}</p>
      <Button className="Button" onClick={handleAddClick}>Add New Item</Button>
      {editedMenuItem ? (
        <Form onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={editedMenuItem.name} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" value={editedMenuItem.description} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control type="text" name="image" value={editedMenuItem.image} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" value={editedMenuItem.price} onChange={handleInputChange} required />
          </Form.Group>
          <Button type="submit">Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Form>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* <tbody>
            {menuItems.map((menuItem) => (
              <tr key={menuItem.id}>
                <td>{menuItem.name}</td>
                <td><img src={menuItem.image} alt={menuItem.name} style={{ width: '100px' }} /></td>
                <td>${menuItem.price.toFixed(2)}</td>
                <td><Button onClick={() => handleEditClick(menuItem)}>Edit</Button></td>
              </tr>
            ))}
          </tbody> */}
        </Table>
      )}
      <CustomerView />
    </div>
  );
};

export default Menu;
