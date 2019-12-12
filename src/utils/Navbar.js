import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="nav">
            <Link className="nav" to="/">
                Home
            </Link>
            <Link className="nav" to="/about">
                About
            </Link>
        </div>
    );
};

export default Navbar;
