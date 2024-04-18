import React from 'react';
import MenuItem from './MenuItem';
import './Section.css';

interface iMenuItem {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    ingredients: string[]; 
  }
  
  interface SectionProps {
    sectionTitle: string; // The title of the section
    items: iMenuItem[]; // The items in this section
  }
  
function Section({ sectionTitle, items }: SectionProps) {
  return (
    <div className="menuSection">
      <h2 className="header">{sectionTitle}</h2>
      <div className="itemList">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            title={item.title}
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
