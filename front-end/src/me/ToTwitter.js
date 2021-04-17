import React, { useState, useEffect } from 'react'
import './ToTwitter.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const ToTwitter = (props) => {
    const [request_token, SetReqToken] = useState([])
    const [request_token_secret, SetReqTokenSecret] = useState([])

    const _handleOnClick = (e) => {
        
        axios
            .get("/get_twitter_request_token")
            .then((response) => {
                SetReqToken(response.data.oauth_token)
                SetReqTokenSecret(response.data.oauth_token_secret)
            })
            .catch((err) => {
                console.error(err)
            }) 

        console.log(request_token, request_token_secret)

    }

    return (
        <div className = 'ToTwitter'>
            <NavLink id = 'back' to = '/me'>
                Back
            </NavLink>
            <h1>Connect to Twitter</h1>
            <hr></hr>
            <button id = 'Twitter' onClick = {(e) => {_handleOnClick(e.target)}}>

            </button>
        </div>
    )
}

export default ToTwitter