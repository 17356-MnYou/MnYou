import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Menu, { MenuProps } from './Menu';
import Navbar from '../Navbar';

const MenuDetails: React.FC = () => {
  const { menuId } = useParams<{ menuId: string }>();
  const [menu, setMenu] = useState<MenuProps | null>(null);

  useEffect(() => {
    const fetchMenuDetails = async () => {
      try {
        const response = await fetch(`${process.env.API_ENDPOINT}/api/menus/${menuId}`);
        if (!response.ok) throw new Error('Failed to fetch menu details: ' + response.statusText);
        const menu_data = await response.json();
        console.log(menu_data);

        if (Array.isArray(menu_data.organizedItems)) {
          const convertedMenu = {
            ...menu_data,
            organizedItems: menu_data.organizedItems.map((section: any) => ({
              ...section,
              items: section.items.map((item: any) => ({
                ...item,
                price: parseFloat(item.price)
              }))
            }))
          };
          setMenu(convertedMenu);
        } else {
          console.error('menu_data.organizedItems is not an array:', menu_data.organizedItems);
        }
      } catch (error: any) {
        console.error(error.message || 'Failed to fetch menu details');
      }
    };
    fetchMenuDetails();
  }, [menuId]);

  return (
    <>
      <Navbar />
      {menu ? <Menu {...menu} /> : <div>Loading...</div>}
    </>
  );
};

export default MenuDetails;
