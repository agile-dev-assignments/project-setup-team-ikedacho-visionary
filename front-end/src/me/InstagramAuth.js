import React, { useState, useEffect } from 'react'
import './ToInstagram.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const InstagramAuth = (props) => {
    // the following side-effect will be called once upon initial render
    useEffect(() => {
        axios('/auth_ins')
    }, []) // only run it once!

    return (
        <div className='InstagramAuth'>
            <NavLink id='back' to='/me'>
                Back
            </NavLink>
            <h1>Instagram Auth Page</h1>
            <hr></hr>
        </div>
    )
}

export default InstagramAuth
