import './MenuItem.css'
import friedRice from './friedRice.jpeg'
import { useNavigate } from "react-router-dom";


interface iMenuItem { 
  "key": number;
  "id": number;
  "title": string; 
  "description": string; 
  "image": string; 
  "price": number;
  "ingredients": string[]; 
}

function MenuItem(props: iMenuItem) {

  const navigate = useNavigate();


  function navigateToItemDescription(){ 
    navigate(`/menuItem/${props.id}`);
  }

  return (
    <div className="menuItemBox" onClick={navigateToItemDescription}>
    <div className="menuItemImage"><img className="foodImage" src={''}></img></div>
    <div className="menuItemDescription">
      {props.title.length > 14 ? <p><b>{props.title.substring(0,14)}...</b></p> : <p><b>{props.title}</b></p>}
      <p>${props.price}</p>
    </div>
    </div>
  );
}

export default MenuItem;



