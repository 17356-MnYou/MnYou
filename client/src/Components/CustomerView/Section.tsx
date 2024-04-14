import React from 'react';
import MenuItem from './MenuItem';
import './Section.css';

interface iMenuItem {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    ingredients: string[]; 
  }
  
  interface SectionProps {
    title: string; // The name of the section
    items: iMenuItem[]; // The items in this section
  }
  
function Section({ title, items }: SectionProps) {
  return (
    <div className="menuSection">
      <h2 className="header">{title}</h2>
      <div className="itemList">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            name={item.name}
            description={item.description}
            image={item.image}
            price={item.price}
            ingredients={item.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default Section;
