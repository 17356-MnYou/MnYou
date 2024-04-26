import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import CustomerView from '../CustomerView/CustomerView';
import './Menu.css';

export interface MenuItem {
  id: number;
  title: string;
  secondaryTitle: string;
  image: string;
  price: number;
  description: string;
  isActive: boolean;
  menu: number;
  section: number;
}

export interface MenuSection {
  section_name: string;
  items: MenuItem[];
}

export interface MenuProps {
  id: number;
  phoneNumber: string;
  username: string;
  password: string;
  primaryFont: string;
  secondaryFont: string;
  primaryFontColor: string;
  secondaryFontColor: string;
  backgroundColor: string;
  orientation: number;
  name: string;
  address: string;
  organizedItems: MenuSection[];
}

const Menu: React.FC<MenuProps> = ({
  id,
  primaryFont,
  secondaryFont,
  primaryFontColor,
  secondaryFontColor,
  backgroundColor,
  orientation,
  name,
  address,
  organizedItems,
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
    const newItem = { id: Date.now(), title: '', secondaryTitle: '', image: '', price: 0, description: '', isActive: true, menu: id, section: 1 };
    setEditedMenuItem(newItem);
  };

  return (
    <div className="Menu">
      <h2>{name}</h2>
      <p>{address}</p>
      {editedMenuItem ? (
        <Form onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="title" value={editedMenuItem.title} onChange={handleInputChange} required />
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
        <Table className="Table" striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {organizedItems.map((section) =>
              section.items.map((menuItem) => (
                <tr key={menuItem.id}>
                  <td>{menuItem.title}</td>
                  <td><img src={menuItem.image} alt={menuItem.title} style={{ width: '100px' }} /></td>
                  <td>${menuItem.price.toFixed(2)}</td>
                  <td><Button onClick={() => handleEditClick(menuItem)}>Edit</Button></td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
      <Button className="Button" onClick={handleAddClick}>Add New Item</Button>
      
      <div className="customer-view-container">
        <h2>Customer View</h2>
        <CustomerView />
        <Button className="floating-button Button">Edit</Button>
      </div>
    </div>
  );
};

export default Menu;
