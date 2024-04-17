import Section from './Section';
import './CustomerView.css';
import { useState } from 'react';

interface iMenuItem { 
  "id": number;
  "name": string; 
  "description": string; 
  "image": string; 
  "price": number;
  "ingredients": string[]; 
}

interface iSection { 
    [section: string]: iMenuItem[];
}
function CustomerView() {

  const [search, setSearch] = useState('');
    const [sectionItems, setSectionItems] = useState<iSection>({
      "Appetizers": [
        {
          "id": 1,
          "name": "Fried Calamari",
          "description": "Lightly fried calamari served with a side of marinara sauce.",
          "image": "https://example.com/images/fried_calamari.jpg",
          "price": 10.99,
          "ingredients": ["Calamari", "Flour", "Salt", "Pepper", "Marinara Sauce"]
        },
        {
          "id": 2,
          "name": "Bruschetta",
          "description": "Grilled bread topped with tomato, basil, garlic, and mozzarella.",
          "image": "https://example.com/images/bruschetta.jpg",
          "price": 8.50,
          "ingredients": ["Bread", "Salt", "Tomato", "Basil", "Garlic", "Mozzarella"]
        },
        {
          "id": 3,
          "name": "Stuffed Mushrooms",
          "description": "Mushrooms stuffed with cheese, garlic, and breadcrumbs.",
          "image": "https://example.com/images/stuffed_mushrooms.jpg",
          "price": 9.75,
          "ingredients": ["Mushrooms", "Cheese", "Garlic", "Breadcrumbs"]
        },
        {
          "id": 4,
          "name": "Chicken Wings",
          "description": "Spicy chicken wings served with blue cheese dressing.",
          "image": "https://example.com/images/chicken_wings.jpg",
          "price": 11.00,
          "ingredients": ["Chicken Wings", "Hot Sauce", "Butter", "Blue Cheese Dressing"]
        },
        {
          "id": 5,
          "name": "Garlic Bread",
          "description": "Crispy garlic bread topped with butter and herbs.",
          "image": "https://example.com/images/garlic_bread.jpg",
          "price": 5.25,
          "ingredients": ["Bread", "Garlic", "Butter", "Herbs"]
        }
      ],
      "Entrees": [
        {
          "id": 6,
          "name": "Margherita Pizza",
          "description": "Classic Margherita pizza with fresh mozzarella, tomatoes, and basil.",
          "image": "https://example.com/images/margherita_pizza.jpg",
          "price": 14.99,
          "ingredients": ["Pizza Dough", "Tomatoes", "Mozzarella", "Basil"]
        },
        {
          "id": 7,
          "name": "Spaghetti Carbonara",
          "description": "Traditional spaghetti carbonara with eggs, cheese, pancetta, and pepper.",
          "image": "https://example.com/images/spaghetti_carbonara.jpg",
          "price": 15.50,
          "ingredients": ["Spaghetti", "Eggs", "Cheese", "Pancetta", "Pepper"]
        },
        {
          "id": 8,
          "name": "Vegetarian Lasagna",
          "description": "Layered lasagna with ricotta, spinach, mushrooms, and tomato sauce.",
          "image": "https://example.com/images/vegetarian_lasagna.jpg",
          "price": 13.75,
          "ingredients": ["Lasagna Noodles", "Ricotta", "Spinach", "Mushrooms", "Tomato Sauce"]
        },
        {
          "id": 9,
          "name": "Grilled Salmon",
          "description": "Grilled salmon with a lemon butter sauce served with vegetables.",
          "image": "https://example.com/images/grilled_salmon.jpg",
          "price": 18.00,
          "ingredients": ["Salmon", "Lemon", "Butter", "Vegetables"]
        },
        {
          "id": 10,
          "name": "Beef Bourguignon",
          "description": "Slow-cooked beef bourguignon with mushrooms, onions, and carrots.",
          "image": "https://example.com/images/beef_bourguignon.jpg",
          "price": 22.99,
          "ingredients": ["Beef", "Red Wine", "Mushrooms", "Onions", "Carrots"]
        }
      ]
    }
    );

    const filteredSections: iSection = Object.fromEntries(
      Object.entries(sectionItems).map(([sectionName, items]) => [
        sectionName,
        items.filter(item => 
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(search.toLowerCase())
          )
        )
      ]).filter(([_, filteredItems]) => filteredItems.length > 0)
    );

  return (
    <div>
      <h1>Name of restaurant</h1>
      <p>Address of restaurant</p>
      <div className="line-separator"></div>
      <input
        className="searchBar"
        type="text"
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="filterContainer">
        <button className="buttonFilled">Vegan</button>
        <button>+ Filter</button>
      </div>
      {Object.entries(filteredSections).map(([sectionName, items]) => (
        <Section key={sectionName} title={sectionName} items={items} />
      ))}
    </div>
  );
}

export default CustomerView;
