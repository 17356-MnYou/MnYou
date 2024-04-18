import Section from './Section';
import './CustomerView.css';
import { useEffect, useState } from 'react';


function CustomerView() {

  const [menuData, setMenuData] = useState<any[]>([]);

  const [storeName, setStoreName] = useState(""); 

  const [storeAddress, setStoreAddress] = useState(""); 

  useEffect(() => {
    fetch('http://localhost:3000/api/menus/1')
         .then((response) => response.json())
         .then((data) => {
            setMenuData(data.organizedItems);
            setStoreName(data.name); 
            setStoreAddress(data.address);
         })
         .catch((err) => {
            console.log(err.message);
         });
  }, []);

  const [search, setSearch] = useState('');

  return (
    <div>
      <h1>{storeName}</h1>
      <p>{storeAddress}</p>
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
      {menuData ? menuData.map((item: any) => (
        <Section key={item.section_name} sectionTitle={item.section_name} items={item.items} />
      )) : <p>Loading menu...</p>}
    </div>
  );
}

export default CustomerView;
