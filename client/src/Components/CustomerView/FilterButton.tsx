import React, { useState } from 'react';
import './FilterButton.css';

interface iFilterButton { 
    name: string
}

function FilterButton(props: iFilterButton) {
    // State to track if the button should have the special class
    const [isActive, setIsActive] = useState(false);

    // Function to toggle the state
    function toggleClassName() {
        console.log("set className")
        setIsActive(!isActive);
    }

    // Conditional class application
    const buttonClass = isActive ? 'buttonFilled' : '';

    return (
        <button className={buttonClass} onClick={toggleClassName}>{props.name}</button>
    );
}

export default FilterButton;
