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
        </div>
    )
}

export default ToInstagram
