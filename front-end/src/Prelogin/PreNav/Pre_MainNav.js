import React from 'react'
import { NavLink } from 'react-router-dom'
import './Pre_MainNav.css'

// components_showcase page is placed here for building/inspecting purpose
// It will not appear in the Navigation bar in finalized version 
const Pre_MainNav = (props) => {
    return (
        <nav className ="premainnav" id='sticky'>
            <NavLink  id ="mainnav_button" to = "/login" >Search</NavLink>
            <NavLink  id ="mainnav_button" to = "/">Home</NavLink>
            <NavLink  id ="mainnav_button" to = "/login">Community</NavLink>
            <NavLink id ="mainnav_button" to = "/login">Me</NavLink>
        </nav>
    )
}

export default Pre_MainNav