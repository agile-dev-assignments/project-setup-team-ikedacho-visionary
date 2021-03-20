import React from 'react'
import { NavLink } from 'react-router-dom'
import './MainNav.css'

// components_showcase page is placed here for building/inspecting purpose
// It will not appear in the Navigation bar in finalized version 
const MainNav = (props) => {
    return (
        <nav class ="mainnav" id='sticky'>
            <NavLink  id ="mainnav_button" to = "/search" >Search</NavLink>
            <NavLink  id ="mainnav_button" to = "/">Home</NavLink>
            <NavLink  id ="mainnav_button" to = "/community">Community</NavLink>
            <NavLink id ="mainnav_button" to = "/me">Me</NavLink>
        </nav>
    )
}

export default MainNav