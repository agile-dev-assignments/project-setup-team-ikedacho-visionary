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
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 501) {
                        console.log('Error 501: user is not login; req.user does not exist')
                        alert('You are not logged in. Please log in and try again!')
                        history.push('/login')
                        setTimeout(() => {
                            window.location.href = window.location.href
                        }, 100)
                    }
                }
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

            <p>You must test this feature in our website of domain ozonewebapp.com. You cannot test it locally in localhost. </p>
        </div>
    )
}

export default ToTwitter
