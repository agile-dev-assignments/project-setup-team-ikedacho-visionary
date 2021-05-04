import React, { useState, useEffect } from 'react'
import './ToInstagram.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const ToInstagram = (props) => {
    const _handleOnClick = (e) => {
        window.location.href = `https://api.instagram.com/oauth/authorize?client_id=235520911696213&redirect_uri=https://ozonewebapp.com/instagram_auth/&scope=user_profile,user_media&response_type=code`
    }

    return (
        <div className='ToInstagram'>
            <NavLink id='back' to='/me'>
                Back
            </NavLink>
            <h1>Connect to Instagram</h1>
            <hr></hr>
            <button
                id='Instagram'
                onClick={(e) => {
                    _handleOnClick(e.target)
                }}
            ></button>
        </div>
    )
}

export default ToInstagram