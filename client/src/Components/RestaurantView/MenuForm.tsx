import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { MenuProps } from './Menu';
import './RestaurantView.css';

interface MenuFormProps {
  newMenu: MenuProps | null;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (event: React.FormEvent) => void;
  setNewMenu: React.Dispatch<React.SetStateAction<MenuProps | null>>;
}

const MenuForm: React.FC<MenuFormProps> = ({ newMenu, handleInputChange, handleFormSubmit, setNewMenu }) => {
  if (!newMenu) return null;

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Label>Restaurant Name</Form.Label>
        <Form.Control type="text" name="restaurantName" value={newMenu.restaurantName} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Restaurant Description</Form.Label>
        <Form.Control type="text" name="restaurantDescription" value={newMenu.restaurantDescription} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" name="address" value={newMenu.address} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" name="phoneNumber" value={newMenu.phoneNumber} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Menu Name</Form.Label>
        <Form.Control type="text" name="menuName" value={newMenu.menuName} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Menu Description</Form.Label>
        <Form.Control type="text" name="menuDescription" value={newMenu.menuDescription} onChange={handleInputChange} />
      </Form.Group>
      <Button className="Button" type="submit">Save</Button>
      <Button className="Button" onClick={() => setNewMenu(null)}>Cancel</Button>
    </Form>
  );
};

export default MenuForm;