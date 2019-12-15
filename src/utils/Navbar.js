import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="nav">
            <NavLink
                className="navl"
                activeClassName="selectedLink"
                to="/"
                exact
            >
                Home
            </NavLink>
            <NavLink
                className="navl"
                activeClassName="selectedLink"
                to="/about"
            >
                About
            </NavLink>
        </div>
    )
}

export default Navbar
