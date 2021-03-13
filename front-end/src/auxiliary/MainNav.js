import React from 'react'
import { Link } from 'react-router-dom'
import './MainNav.css'

// components_showcase page is placed here for building/inspecting purpose
// It will not appear in the Navigation bar in finalized version 
const MainNav = (props) => {
    return (
        <nav>
            <Link to = "/search">Search</Link>
            <Link to = "/">Home</Link>
            <Link to = "/community">Community</Link>
            <Link to = "/me">Me</Link>
            <Link to = "/components_showcase">Showcase</Link>
        </nav>
    )
}

export default MainNav