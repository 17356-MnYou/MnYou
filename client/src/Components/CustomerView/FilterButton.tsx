import React, { useState } from 'react';
import './FilterButton.css';

interface iFilterButton { 
    name: string
    filters: string[]
    setFilters: Function
    style: {
        primaryFont: string; secondaryFont: string; primaryFontColor: string; secondaryFontColor: string; backgroundColor: string;
    }
}


function FilterButton(props: iFilterButton) {
    // State to track if the button should have the special class
    const [isActive, setIsActive] = useState(props.filters.includes(props.name));

    // Function to toggle the state
    function toggleClassName() {
        console.log("set className")
        setIsActive(!isActive);
        if(!isActive){
            let arr = [...props.filters]; 
            arr.push(props.name); 
            props.setFilters(arr);
        } else { 
            props.setFilters(props.filters.filter(f => f !== props.name));
        }
    }

    // Conditional class application
    const buttonClass = isActive ? 'buttonFilled' : '';
    const styleChoice = isActive ? props.style.secondaryFontColor : '';

    return (
        <button style={{background: styleChoice}} className={buttonClass} onClick={toggleClassName}>{props.name}</button>
    );
}

export default FilterButton;
