import Section from './Section';
import './CustomerView.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


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

  return (
    <div style={{textAlign: 'left', fontFamily: props.style.primaryFont, backgroundColor: props.style.backgroundColor, color: props.style.primaryFontColor}}>
      <h1>{details.title}</h1>
      <p>{details.secondaryTitle}</p>
      <img src={`/${details.image}`}></img>
      <p>${details.price}</p>
      <p style={{color: props.style.secondaryFontColor}}><i>{details.description}</i></p>
    </div>
  );
}

export default MenuItemDetails;
