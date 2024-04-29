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
  const [color, setColor] = useState<string>(localStorage.getItem('backgroundColor') || backgroundColor);
  const [font, setFont] = useState<string>(localStorage.getItem('primaryFont') || primaryFont);
  const [secondaryFontState, setSecondaryFont] = useState<string>(localStorage.getItem('secondaryFont') || secondaryFont);
  const [primaryFontColorState, setPrimaryFontColor] = useState<string>(localStorage.getItem('primaryFontColor') || primaryFontColor);
  const [secondaryFontColorState, setSecondaryFontColor] = useState<string>(localStorage.getItem('secondaryFontColor') || secondaryFontColor);
  const [orientationState, setOrientation] = useState<number>(localStorage.getItem('orientation') ? Number(localStorage.getItem('orientation')) : orientation);
  const [nameState, setName] = useState<string>(localStorage.getItem('name') || name);
  const [addressState, setAddress] = useState<string>(localStorage.getItem('address') || address);

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

  const handleSaveSettings = async () => {
    const response = await fetch(`http://localhost:3000/api/menus/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        primaryFont: font,
        secondaryFont: secondaryFontState,
        primaryFontColor: primaryFontColorState,
        secondaryFontColor: secondaryFontColorState,
        backgroundColor: color,
        orientation: orientationState,
        name: nameState,
        address: addressState,
      }),
    });

    if (response.ok) {
      // Update the state to reflect the new settings
      setFont(font);
      setSecondaryFont(secondaryFontState);
      setPrimaryFontColor(primaryFontColorState);
      setSecondaryFontColor(secondaryFontColorState);
      setColor(color);
      setOrientation(orientationState);
      setName(nameState);
      setAddress(addressState);
      
      localStorage.setItem('backgroundColor', color);
      localStorage.setItem('primaryFont', font);
      localStorage.setItem('secondaryFont', secondaryFontState);
      localStorage.setItem('primaryFontColor', primaryFontColorState);
      localStorage.setItem('secondaryFontColor', secondaryFontColorState);
      localStorage.setItem('orientation', orientationState.toString());
      localStorage.setItem('name', nameState);
      localStorage.setItem('address', addressState);
      alert('Settings saved successfully!');
    } else {
      console.error('Failed to save settings:', await response.text());
    }
  };

  return (
    <div className="Menu">
      <h2>{name}</h2>
      <p>{address}</p>

      <div className="settings-and-view-container">
        <div>
          <h2 className="centered-title">Customer View</h2>
          <div className="customer-view-container" style={{ backgroundColor: color, fontFamily: font }}>
            <CustomerView />
            <Button className="floating-button Button">Edit</Button>
          </div>
        </div>

        <div className="settings">
          <h2>Settings</h2>
          <label>
            Primary Font:
            <select value={font} onChange={(e) => setFont(e.target.value)}>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Courier New">Courier New</option>
            </select>
          </label>
          <label>
            Secondary Font:
            <select value={secondaryFontState} onChange={(e) => setSecondaryFont(e.target.value)}>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Courier New">Courier New</option>
            </select>
          </label>
          <label>
            Primary Font Color:
            <input type="color" value={primaryFontColorState} onChange={(e) => setPrimaryFontColor(e.target.value)} />
          </label>
          <label>
            Secondary Font Color:
            <input type="color" value={secondaryFontColorState} onChange={(e) => setSecondaryFontColor(e.target.value)} />
          </label>
          <label>
            Background Color:
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          </label>
          <label>
            Orientation:
            <input type="number" value={orientationState} onChange={(e) => setOrientation(Number(e.target.value))} />
          </label>
          <label>
            Name:
            <input type="text" value={nameState} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Address:
            <input type="text" value={addressState} onChange={(e) => setAddress(e.target.value)} />
          </label>
          <div className="save-settings-button-container">
            <Button className="Button" onClick={handleSaveSettings}>Save Settings</Button>
          </div>
        </div>
      </div>
      
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
    </div>
  );
};

export default Menu;