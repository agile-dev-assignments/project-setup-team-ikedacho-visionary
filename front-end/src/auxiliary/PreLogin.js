import React from 'react'
import { Link } from 'react-router-dom'
import './PreLogin.css'

// Login page is placed here for building/inspecting purpose
// It will not appear in the Navigation bar in finalized version 
const PreLogin = (props) => {
    return (
        <>
            <header>
                You haven't logged-in yet! 
                Login in or Sign up to gain access to full functionality
            </header>

            <nav className = "PreLogin">
                <Link to = "/login">Login</Link>
                <Link to = "/signup">Sign Up</Link>
            </nav>
        </>
    )
}

export default PreLogin