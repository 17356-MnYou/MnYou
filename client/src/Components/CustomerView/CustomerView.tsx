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
  console.log(routeMenuIdString);
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
    pescetarian: ['meat', 'chicken', 'beef'],
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

  return (
    <div style={{ backgroundColor }}>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Select filters</DialogTitle>
        <p style={{ marginLeft: 0 }}>Dietary restrictions:</p>
        <div className="buttonContainer">
          {dietaryPreferences.map((option, index) => {
            return <FilterButton style={storeStyle} filters={filters} setFilters={setFilters} key={index} name={option} />
          })}
        </div>
        <p style={{ marginLeft: 0 }}>Ingredient restrictions:</p>
        <div className="buttonContainer">
          {ingredientPreferences.map((option, index) => {
            return <FilterButton style={storeStyle} filters={filters} setFilters={setFilters} key={index} name={option} />
          })}
        </div>
      </Dialog>
      <div style={{ textAlign: 'left', fontFamily: storeStyle.primaryFont, backgroundColor: storeStyle.backgroundColor, color: storeStyle.primaryFontColor }}>
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
            return <button style={{ background: storeStyle.secondaryFontColor }}>{filterName}</button>
          })}
          <button onClick={handleOpen}>+ Filter</button>
        </div>
        {filteredMenuItems ? filteredMenuItems.map((item: any) => (
          <Section key={item.section_name} sectionTitle={item.section_name} items={item.items} />
        )) : <p>Loading menu...</p>}
      </div>
    </div>
  );
}

export default CustomerView;
