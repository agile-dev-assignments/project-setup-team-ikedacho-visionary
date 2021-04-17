import React, { useState, useEffect } from 'react'
import './ToInstagram.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const ToInstagram = (props) => {
    const [request_token, SetReqToken] = useState([])
    const [request_token_secret, SetReqTokenSecret] = useState([])
    var client_id = '483061323052381',
    redirect_uri = 'https://localhost:3000/auth/instagram/callback',
    auth_url = 'https://api.instagram.com/oauth/authorize/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&scope=user_profile,user_media'+ '&response_type=code'
    
    const _handleOnClick = (e) => {
        
        window.location.href = auth_url;

    }

    return (
        <div className = 'ToInstagram'>
            <NavLink id = 'back' to = '/me'>
                Back
            </NavLink>
            <h1>Connect to Instagram</h1>
            <hr></hr>
            <button id = 'Instagram' onClick = {(e) => {_handleOnClick(e.target)}}>

            </button>
        </div>
    )
}

export default ToInstagram