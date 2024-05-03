import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { Form, Button } from 'react-bootstrap';
import './RestaurantView.css';

const RestaurantForm = () => {
  const [newMenu, setNewMenu] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    username: '',
    password: ''
  });

  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setNewMenu(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/restaurants/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMenu)
      });
      console.log('Restaurant data:', newMenu);
      if (response.ok) {
        alert('Restaurant data saved successfully'); // Show an alert or another form of feedback
        setNewMenu({ name: '', address: '', phoneNumber: '', username: '', password: '' }); // Reset form
        navigate('/restaurant');
      } else {
        console.error('Failed to save restaurant data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
      <Form.Group className="form-group-spacing">
        <Form.Label className="form-label-spacing">Username:</Form.Label>
        <Form.Control className="prettier-input" type="text" name="username" value={newMenu.username} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="form-group-spacing">
        <Form.Label className="form-label-spacing">Password:</Form.Label>
        <Form.Control className="prettier-input" type="text" name="password" value={newMenu.password} onChange={handleInputChange} />
      </Form.Group>
      <Button className="Button" type="submit">Save</Button>
    </Form>
  );
};

export default RestaurantForm;
