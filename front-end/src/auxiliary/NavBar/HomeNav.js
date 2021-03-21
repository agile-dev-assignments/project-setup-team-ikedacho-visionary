import React from 'react'
import { NavLink } from 'react-router-dom'
import './HomeNav.css'

// Login page is placed here for building/inspecting purpose
// It will not appear in the Navigation bar in finalized version 
const HomeNav = (props) => {
    return (
        <nav className = "homenav">
            <NavLink id='homenav_button' to="/">What's New</NavLink>
            <NavLink id='homenav_button' to="/recent">Recently Visited</NavLink>
            <NavLink id='homenav_button' to="/recommend">Recommend</NavLink>
        </nav>
    )
}

export default HomeNav
