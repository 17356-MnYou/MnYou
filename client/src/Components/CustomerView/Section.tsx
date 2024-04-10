import MenuItem from './MenuItem';
import './Section.css'

interface iMenuItem { 
    "id": number;
    "name": string; 
    "description": string; 
    "image": string; 
    "price": number;
}

function Section() {

    let sectionItems: iMenuItem[]  = [
        {
            "id": 0,
            "name": "Fried Rice",
            "description": "Classic fried rice with eggs, green peas, carrots, and green onions, seasoned with soy sauce and sesame oil.",
            "image": "https://example.com/images/fried_rice.jpg",
            "price": 8.99
        },
        {
            "id": 1,
            "name": "Chicken Parmesan",
            "description": "Breaded chicken breast topped with marinara sauce and melted mozzarella, served over spaghetti.",
            "image": "https://example.com/images/chicken_parmesan.jpg",
            "price": 15.50
        },
        {
            "id": 2,
            "name": "Caesar Salad",
            "description": "Crisp romaine lettuce tossed in Caesar dressing with croutons and shaved Parmesan cheese.",
            "image": "https://example.com/images/caesar_salad.jpg",
            "price": 10.00
        },
        {
            "id": 3,
            "name": "Margherita Pizza",
            "description": "Classic Margherita pizza with fresh mozzarella, tomatoes, basil leaves, and a drizzle of olive oil on a thin crust.",
            "image": "https://example.com/images/margherita_pizza.jpg",
            "price": 12.75
        },
        {
            "id": 4,
            "name": "Vegan Burger",
            "description": "A plant-based burger patty on a whole wheat bun, topped with lettuce, tomato, pickles, and vegan mayo.",
            "image": "https://example.com/images/vegan_burger.jpg",
            "price": 11.25
        }
    ]


    return (
        <div className="menuSection">
            <h2 className="header">Apps</h2>
            <div className="itemList">
            {sectionItems.map((item) => {
                return (
                    <MenuItem key={item.id} name={item.name} description={item.description} image={item.image} price={item.price}/>
                )
            })}
            </div>
            <h2 className="header">Entrees</h2>
            <div className="itemList">
            {sectionItems.map((item) => {
                return (
                    <MenuItem key={item.id} name={item.name} description={item.description} image={item.image} price={item.price}/>
                )
            })}
            </div>
        </div>
    );
}

export default Section;



