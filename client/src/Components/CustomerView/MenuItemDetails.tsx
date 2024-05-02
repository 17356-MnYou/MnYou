import Section from './Section';
import './CustomerView.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MenuItemDetails.css'
import { useNavigate } from "react-router-dom";


interface iDetails { 
  title: string; 
  secondaryTitle: string; 
  price: string; 
  description: string; 
  image: string; 
}

interface iStyle { 
  style: {
    primaryFont: string; secondaryFont: string; primaryFontColor: string; secondaryFontColor: string; backgroundColor: string;
  }
}

function MenuItemDetails(props: iStyle) {

  const navigate = useNavigate();

  const sampleIngredientList = ['🍅 tomato', '🧀 cheese', '🌿 basil']

  const [ingredients, setIngredients] = useState([]);

  let { menuItemId } = useParams();

  const [details, setDetails] = useState<iDetails>({
    title: '',           
    secondaryTitle: '', 
    price: '',          
    description: '',    
    image: ''           
  });

  const [storeStyle, setStoreStyle] = useState({
    primaryFont: '',
    secondaryFont: '',
    primaryFontColor: '',
    secondaryFontColor: '',
    backgroundColor: ''
  });
  
  useEffect(() => {
    fetch(`http://localhost:3000/api/menus/1/${menuItemId}`)
         .then((response) => response.json())
         .then((data) => {
            const newData = {
              title: data[0].title || '', 
              secondaryTitle: data[0].secondaryTitle || '',
              price: data[0].price || '',
              description: data[0].description || '',
              image: data[0].image || '', 
              ing: data.ing || '',
            };
            setDetails(newData);
            const formattedData = newData.ing.map((item: { image: any; name: any; }) => `${item.image} ${item.name}`);
            setIngredients(formattedData);
         })
         .catch((err) => {
            console.log(err.message);
         });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/menus/1`)
         .then((response) => response.json())
         .then((data) => {
            setStoreStyle({
              primaryFont: data.primaryFont,
              secondaryFont: data.secondaryFont,
              primaryFontColor: data.primaryFontColor,
              secondaryFontColor: data.secondaryFontColor,
              backgroundColor: data.backgroundColor
            });
         })
         .catch((err) => {
            console.log(err.message);
         });
  }, []);

  function navigateToMainMenu(){ 
    //should be whichever menu item we need but can come back to later
    navigate(`/customer/1`);
  }

  return (    
    <div className="menuItemDetailsBox" style={{textAlign: 'left', fontFamily: storeStyle.primaryFont, backgroundColor: storeStyle.backgroundColor, color: storeStyle.primaryFontColor}}>
    <button style={{fontFamily: storeStyle.primaryFont}} onClick={navigateToMainMenu}>Back to menu</button>
      <h1>{details.title}</h1>
      <p>{details.secondaryTitle}</p>
      <img className="detailImg" src={`/${details.image}`}></img>
      <p>${details.price}</p>
      <p className="detailText" style={{color: props.style.secondaryFontColor}}><i>{details.description}</i></p>
      {/* add once we have ingredient list  */}
      <h3>Ingredients:</h3>
      <div className="ingredientContainer">
      {ingredients.map(ingredient => (
          <span className='ingredientPill' style={{backgroundColor: storeStyle.primaryFontColor, color: 'white'}} key={ingredient} >
            {ingredient}
          </span>
      ))}
      </div>
    </div>
  );
}

export default MenuItemDetails;
