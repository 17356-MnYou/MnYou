import Section from './Section';
import './CustomerView.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle } from '@mui/material';
import FilterButton from './FilterButton';

interface CustomerViewProps {
  menuId?: number;
  backgroundColor?: string;
  primaryFont?: string;
  secondaryFont?: string;
  primaryFontColor?: string;
  secondaryFontColor?: string;
  orientation?: number;
  name?: string;
  address?: string;
}

function CustomerView({
  menuId: propMenuId,
  backgroundColor,
  primaryFont,
  secondaryFont,
  primaryFontColor,
  secondaryFontColor,
  orientation,
  name,
  address
}: CustomerViewProps) {
  const { menuId: routeMenuIdString } = useParams() as { menuId: string };
  const routeMenuId = Number(routeMenuIdString);
  const menuId = propMenuId ?? routeMenuId;

  interface DietaryOptions {
    'vegan'?: string[];
    'vegetarian'?: string[];
    'pescetarian'?: string[];
    'dairy free'?: string[];
  };

  const [menuData, setMenuData] = useState<any[]>([]);

  const [filteredMenuItems, setFilteredMenuItems] = useState<any[]>([]);

  const [storeName, setStoreName] = useState("");

  const [storeAddress, setStoreAddress] = useState("");

  const [storeStyle, setStoreStyle] = useState({
    primaryFont: '',
    secondaryFont: '',
    primaryFontColor: '',
    secondaryFontColor: '',
    backgroundColor: ''
  });

  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState([]);

  const dietaryPreferences = ['vegan', 'vegetarian', 'pescetarian', 'dairy free', 'gluten free']

  interface FilterDetails {
    [key: string]: string[];
  }

  const filterDetails: FilterDetails = {
    vegan: ['meat', 'chicken', 'beef', 'fish', 'cheese', 'rice'],
    vegetarian: ['meat', 'chicken', 'beef', 'fish'],
    pescetarian: ['fish', 'shrimp', 'crab'],
    dairyFree: ['cheese', 'milk', 'yogurt']
  };
  const ingredientPreferences = ['no olives', 'no broccoli', 'no eggs', 'no cabbage', 'no peppers']


  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  useEffect(() => {
    fetch(`${process.env.API_ENDPOINT}/api/menus/${menuId}`)
      .then((response) => response.json())
      .then((data) => {
        setMenuData(data.organizedItems);
        setStoreName(name || data.name);
        setStoreAddress(address || data.address);
        setStoreStyle({
          primaryFont: primaryFont || data.primaryFont,
          secondaryFont: secondaryFont || data.secondaryFont,
          primaryFontColor: primaryFontColor || data.primaryFontColor,
          secondaryFontColor: secondaryFontColor || data.secondaryFontColor,
          backgroundColor: backgroundColor || data.backgroundColor
        });
        setFilteredMenuItems(data.organizedItems);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [menuId, backgroundColor, primaryFont, secondaryFont, primaryFontColor, secondaryFontColor, orientation, name, address]);

  const [search, setSearch] = useState('');

  useEffect(() => {
    const filtered = menuData.map(section => ({
      ...section,
      items: section.items.filter((item: { title: string; }) => item.title?.toLowerCase().includes(search.toLowerCase()))
    })).filter(section => section.items.length > 0);
    setFilteredMenuItems(filtered);
  }, [search, menuData]);  

  //needs to be updated once we have proper ingredients for each item
  useEffect(() => {
    let filterList: string[] = [];
  
    //collect ingredients to exclude based on active filters
    filters.forEach((filter) => {
      if (filterDetails[filter]) {
        filterList.push(...filterDetails[filter].map(ingredient => ingredient.toLowerCase()));
      } else {
      }
    });
       
     //apply the filtering logic across the menu items
     const filtered = menuData.map(section => ({
      ...section,
      items: section.items.filter((item: { ingredients: any[]; }) => {
        //check if any ingredient in the item is in the filterList
        return !item.ingredients.some(ingredient => filterList.includes(ingredient.name.toLowerCase()));
      })
    })).filter(section => section.items.length > 0);
  
    setFilteredMenuItems(filtered);
  }, [filters, menuData]);
  

  return (
    <div style={{ backgroundColor }}>
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select filters</DialogTitle>
      <p style={{marginLeft: 0}}>Dietary restrictions:</p>
      <div className="buttonContainer">
      {dietaryPreferences.map((option, index) => { 
        return <FilterButton style={storeStyle} filters={filters} setFilters={setFilters} key={index} name={option}/>
      })}
      </div>
      {/* <p style={{marginLeft: 0}}>Ingredient restrictions:</p>
      <div className="buttonContainer">
      {ingredientPreferences.map((option, index) => { 
        return <FilterButton style={storeStyle} filters={filters} setFilters={setFilters} key={index} name={option}/>
      })}
      </div> */}
    </Dialog>
    <div style={{ textAlign: 'left',fontFamily: `${storeStyle.primaryFont}`, backgroundColor: storeStyle.backgroundColor, color: storeStyle.primaryFontColor, minHeight: '100vh'}}>
      <h1>{storeName}</h1>
      <p>{storeAddress}</p>
      <div style={{ background: storeStyle.secondaryFontColor }} className="line-separator"></div>
      <input
        className="searchBar"
        type="text"
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="filterContainer">
        {filters.map((filterName) => { 
          return <button key={filterName} style={{ background: storeStyle.secondaryFontColor, fontFamily: `${storeStyle.primaryFont}`, color: 'white'}}>{filterName}</button>
        })}
        <button style={{fontFamily: `${storeStyle.primaryFont}`}} onClick={handleOpen}>+ Filter</button>
      </div>
      {filteredMenuItems ? filteredMenuItems.map((item: any, index) => (
        <Section style={storeStyle} key={item.section_name} sectionTitle={item.section_name} items={item.items} />
      )) : <p>Loading menu...</p>}
    </div>
    </div>
  );
}

export default CustomerView;
