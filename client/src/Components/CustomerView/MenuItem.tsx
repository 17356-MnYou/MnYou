import './MenuItem.css'
import friedRice from './friedRice.jpeg'
import { useNavigate } from "react-router-dom";


interface iMenuItem { 
  "key": number;
  "name": string; 
  "description": string; 
  "image": string; 
  "price": number;
  "ingredients": string[]; 
}

function MenuItem(props: iMenuItem) {

  const navigate = useNavigate();


  function navigateToItemDescription(){ 
    console.log("navigatetoitemdescription")
    navigate(`/menuItem/${props.name}`);
  }

  return (
    <div className="menuItemBox" onClick={navigateToItemDescription}>
    <div className="menuItemImage"><img className="foodImage" src={friedRice}></img></div>
    <div className="menuItemDescription">
      {props.name.length > 14 ? <p><b>{props.name.substring(0,14)}...</b></p> : <p><b>{props.name}</b></p>}
      <p>${props.price}</p>
    </div>
    </div>
  );
}

export default MenuItem;



