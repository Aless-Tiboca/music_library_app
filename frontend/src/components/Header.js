import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="header-left">
                    <h1>MUSIC LIBRARY</h1>
                </div>
                <nav className="header-nav">
                    <Link to="/">Home</Link>
                    <Link to="/albums">Albums</Link>
                    <Link to="/artists">Artists</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;