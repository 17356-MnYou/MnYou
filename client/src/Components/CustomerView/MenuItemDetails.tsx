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
  let { menuItemId } = useParams();

  const [details, setDetails] = useState<iDetails>({
    title: '',           
    secondaryTitle: '', 
    price: '',          
    description: '',    
    image: ''           
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
              image: data[0].image || ''
            };
            setDetails(newData);
         })
         .catch((err) => {
            console.log(err.message);
         });
  }, []);

  function navigateToMainMenu(){ 
    navigate(`/customer`);
  }

  return (    
    <div className="menuItemDetailsBox" style={{textAlign: 'left', fontFamily: props.style.primaryFont, backgroundColor: props.style.backgroundColor, color: props.style.primaryFontColor}}>
    <button onClick={navigateToMainMenu}>Back to menu</button>
      <h1>{details.title}</h1>
      <p>{details.secondaryTitle}</p>
      <img className="detailImg" src={`/${details.image}`}></img>
      <p>${details.price}</p>
      <p className="detailText" style={{color: props.style.secondaryFontColor}}><i>{details.description}</i></p>
      {/* add once we have ingredient list  */}
      <h3>Ingredients:</h3>
      <div className="ingredientContainer">
      {sampleIngredientList.map(ingredient => (
          <span className='ingredientPill' style={{backgroundColor: props.style.primaryFontColor}} key={ingredient} >
            {ingredient}
          </span>
      ))}
      </div>
    </div>
  );
}

export default MenuItemDetails;
