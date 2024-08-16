import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">Ecommerce Store</div>
            <div className="navbar-links">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/admin" className="navbar-link">Admin</Link>
            </div>
        </nav>
    );
};

export default Navbar;
