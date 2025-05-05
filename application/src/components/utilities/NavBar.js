import React, { useState } from "react";
import './nav-bar.css';

function NavBar() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <>
            {/* Always in DOM, just visually hidden when sidebar is open */}
            <button
                className={`toggle-button ${isOpen ? "hidden" : "visible"}`}
                onClick={toggleSidebar}
            >
                ☰
            </button>

            <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
                <div className="sidebar-header">
                    <h3>PlaceHolder</h3>
                    <button className="close-button" onClick={toggleSidebar}>×</button>
                </div>
                <ul className="sidebar-menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/chat">Chat</a></li>
                    <li><a href="/test">Test</a></li>
                </ul>
            </div>
        </>
    );
}

export default NavBar;

