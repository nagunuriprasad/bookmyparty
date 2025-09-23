// Tabs.js
import React, { useState, useRef } from 'react';
import './assets/css/Tabs.css'; // Import the CSS file

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('All'); // Set the default active tab
    const tabsRef = useRef(null); // Reference for the tabs box

    const tabs = [
        'All', 'Master Chef', 'Chef', 'Associate Chef', 
        'Event Planner', 'Event Organiser', 'Event Manager', 
        'Stage Setup Boys', 'Decoration Boys', 'Flower Decor Boys', 
        'Balloon Decor Boys', 'Food Pickup Boys', 
        'Catering Boys or Girls', 'Standing Service Boys & Girls', 
        'Hotel Management Boys & Girls', 'Welcome Girls', 
        'Couple Service', 'Chinese Girls', 
        'Foreign Girls (Welcome)', 'Liquor Service Boys', 
        'Cocktail Service Boys', 'Supervisors', 
        'Cocktail Mix Boys', 'House Keeping Boys', 
        'Bar Tenders', 'Wallet Parking Drivers', 
        'DRIVERS', 'BOUNCERS', 'SECURITY GUARDS'
    ];

    const scrollLeft = () => {
        if (tabsRef.current) {
            tabsRef.current.scrollBy({ left: -100, behavior: 'smooth' }); // Scroll left by 100px
        }
    };

    const scrollRight = () => {
        if (tabsRef.current) {
            tabsRef.current.scrollBy({ left: 100, behavior: 'smooth' }); // Scroll right by 100px
        }
    };

    return (
        <div className="container">
            <div className="wrapper">
                <div className="icon" onClick={scrollLeft}>
                    <i id="left" className="fa-solid fa-angle-left" aria-hidden="true"></i>
                </div>
                <ul className="tabs-box" ref={tabsRef}>
                    {tabs.map(tab => (
                        <li 
                            key={tab} 
                            className={`tab ${activeTab === tab ? 'active' : ''}`} 
                            onClick={() => setActiveTab(tab)} // Change active tab on click
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
                <div className="icon" onClick={scrollRight}>
                    <i id="right" className="fa-solid fa-angle-right" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
