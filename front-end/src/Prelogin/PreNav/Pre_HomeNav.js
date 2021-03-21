import React from 'react'
import { NavLink } from 'react-router-dom'
import './Pre_HomeNav.css'

// Login page is placed here for building/inspecting purpose
// It will not appear in the Navigation bar in finalized version 
const Pre_HomeNav = (props) => {
    return (
        <nav className = "homenav">
            <NavLink id='homenav_button' to="/prelogin">What's New</NavLink>
            <NavLink id='homenav_button' to="/prerecent">Recently Visited</NavLink>
            <NavLink id='homenav_button' to="/prerecommend">Recommend</NavLink>
        </nav>
    )
}

export default Pre_HomeNav
