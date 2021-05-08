import React, { useState, useEffect } from 'react'
import './ToInstagram.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
const ToInstagram = (props) => {
    let history = useHistory()

    const _handleOnClick = (e) => {
        window.location.href = `https://api.instagram.com/oauth/authorize?client_id=235520911696213&redirect_uri=https://ozonewebapp.com/instagram_auth/&scope=user_profile,user_media&response_type=code`
    }

    const fetchData = async () => {
        await axios('/get_facebook', {})
            .then((response) => {
               
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

    useEffect(() => {
        fetchData()
    }, [])

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
            <p>According to Instagram API policy, in this development phase, only Instagram account that is added as tester to this app can use Instagram API in this app. Please contact us to add you to testers of our app so that O-Zone can correctly connect to your Instagram account. You can send us your Instagram username in Slack or contact lh2510@nyu.edu. As soon as we add you to testers, we will notify you and then you can use this Instagram login button to give permission to O-Zone to access your Instagram post data.</p>
            <p>In addition, you must test this feature in our website of domain ozonewebapp.com. You cannot test it locally in localhost. </p>
        </div>
    )
}

export default ToInstagram
