import React from 'react'
import { NavLink } from 'react-router-dom'
import './MainNav.css'

// components_showcase page is placed here for building/inspecting purpose
// It will not appear in the Navigation bar in finalized version 
const MainNav = (props) => {
    return (
        <nav class ="mainnav">
            <NavLink to = "/search" >Search</NavLink>
            <NavLink to = "/">Home</NavLink>
            <NavLink to = "/community">Community</NavLink>
            <NavLink to = "/me">Me</NavLink>
        </nav>
    )
}

export default MainNav