import Section from './Section';
import './CustomerView.css';

function CustomerView() {
  return (
    <div>
      <h1>Name of restaurant</h1>
      <p>Address of restaurant</p>
      <div className="line-separator"></div>
      <input className="searchBar" type="text" placeholder="Search.."></input>
      <div className="filterContainer">
        <button className="buttonFilled">Vegan</button>
        <button>+ Filter</button>
      </div>
      <Section/>
    </div>
  );
}

export default CustomerView;
