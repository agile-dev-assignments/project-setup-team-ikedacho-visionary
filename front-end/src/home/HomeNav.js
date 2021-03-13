import React from 'react'
import { Link } from 'react-router-dom'
import './HomeNav.css'

// Login page is placed here for building/inspecting purpose
// It will not appear in the Navigation bar in finalized version 
const HomeNav = (props) => {
    return (
        <nav>
            <Link to="/">What's New</Link>
            <Link to="/recent">Recently Visited</Link>
            <Link to="/recommand">recommand</Link>
        </nav>
    )
}

export default HomeNav