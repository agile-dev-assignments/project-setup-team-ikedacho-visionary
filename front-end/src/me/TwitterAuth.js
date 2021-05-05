import React, { useState, useEffect } from 'react'
import './ToInstagram.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import './TwitterAuth.css'

const TwitterAuth = (props) => {
    let history = useHistory()
    // the following side-effect will be called once upon initial render
    const [url, setUrl] = useState([])

    useEffect(() => {
        console.log('window.location.href', window.location.href)
        setUrl(window.location.href)
        console.log('url', url)

        axios('/get_twitter_access_token', {
            params: {
                url: url,
            },
        })
            .then((response) => {
                console.log(response)
                history.push('/me')
                setTimeout(() => {
                    window.location.href = window.location.href
                }, 100)
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 501) {
                        console.log('Error 501: user is not login; req.user does not exist')
                        alert('You are not logged in. Please log in and try again!')
                        history.push('/prelogin')
                        setTimeout(() => {
                            window.location.href = window.location.href
                        }, 100)
                    }
                    if (error.response.status === 500) {
                        console.log('Error 500: permission error')
                        alert('Error. Please try again!')
                        history.push('/me')
                        setTimeout(() => {
                            window.location.href = window.location.href
                        }, 100)
                    }

                    if (error.response.status === 502) {
                        console.log('Error 502: permission error')
                        alert('Error. Please try again!')
                        history.push('/me')
                        setTimeout(() => {
                            window.location.href = window.location.href
                        }, 100)
                    }
                }
            })
    }, [url])

    return (
        <div className='TwitterAuth'>
            <NavLink id='back' to='/me'>
                Back
            </NavLink>
            <h1>Twitter Auth Page</h1>
            <hr></hr>
        </div>
    )
}

export default TwitterAuth
