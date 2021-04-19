import React, { useState, useEffect } from 'react'
import './ToTwitter.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const ToTwitter = (props) => {
    const [request_token, SetReqToken] = useState([])
    const [request_token_secret, SetReqTokenSecret] = useState([])
    const history = createBrowserHistory({ forceRefresh: true })

    const _handleOnClick = (e) => {
        axios
            .get('/get_twitter_request_token')
            .then((response) => {
                console.log(response.data)
                SetReqToken(response.data.oauth_token)
                SetReqTokenSecret(response.data.oauth_token_secret)

                const link = `https://api.twitter.com/oauth/authorize?oauth_token=${response.data.oauth_token}`
                console.log(link)
                window.location.href = link
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <div className='ToTwitter'>
            <NavLink id='back' to='/me'>
                Back
            </NavLink>
            <h1>Connect to Twitter</h1>
            <hr></hr>
            <button
                id='Twitter'
                onClick={(e) => {
                    _handleOnClick(e.target)
                }}
            ></button>
        </div>
    )
}

export default ToTwitter
