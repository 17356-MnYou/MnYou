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
      <Form.Group className="form-group-spacing">
        <Form.Label className="form-label-spacing">Restaurant Name:</Form.Label>
        <Form.Control className="prettier-input" type="text" name="name" value={newMenu.name} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="form-group-spacing">
        <Form.Label className="form-label-spacing">Address:</Form.Label>
        <Form.Control className="prettier-input" type="text" name="address" value={newMenu.address} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="form-group-spacing">
        <Form.Label className="form-label-spacing">Phone Number:</Form.Label>
        <Form.Control className="prettier-input" type="text" name="phoneNumber" value={newMenu.phoneNumber} onChange={handleInputChange} />
      </Form.Group>
      <Button className="Button" type="submit">Save</Button>
      <Button className="Button" onClick={() => setNewMenu(null)}>Cancel</Button>
    </Form>
  );
};

export default MenuForm;