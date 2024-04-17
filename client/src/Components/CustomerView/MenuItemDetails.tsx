import Section from './Section';
import './CustomerView.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';


function MenuItemDetails() {
  let { menuItemId } = useParams();

  return (
    <div>
      <h1>{menuItemId}</h1>
      <p>Will make api call here to get rest of details</p>
    </div>
  );
}

export default MenuItemDetails;
