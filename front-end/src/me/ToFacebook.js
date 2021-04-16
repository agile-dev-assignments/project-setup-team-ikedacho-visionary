import React, { useState, useEffect } from 'react'
import './ToFacebook.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const ToFacebook = (props) => {
    const [accessToken, setAccessToken] = useState([])
    const setUpFacebookSDK = async () => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '901953390599794',
                cookie: true,
                xfbml: true,
                version: 'v10.0',
            })

            window.FB.AppEvents.logPageView()
        }
        ;(function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0]
            if (d.getElementById(id)) {
                return
            }
            js = d.createElement(s)
            js.id = id
            js.src = 'https://connect.facebook.net/en_US/sdk.js'
            fjs.parentNode.insertBefore(js, fjs)
        })(document, 'script', 'facebook-jssdk')
    }
    const setButton = (e) => {
        window.FB.getLoginStatus(function (response) {
            console.log(response)

            if (response.status === 'unknown') {
                // the user isn't logged in to Facebook.

                window.FB.login(
                    function (response) {
                        // handle the response
                        console.log(response)
                        if (response.status === 'connected') {
                            console.log('Successed! User logged in and autenticated')
                            let accessToken = response.authResponse.accessToken
                            console.log(accessToken)
                            setAccessToken(accessToken)
                            // modify the facebook element.
                            e.style.background = '#3b5998'
                            e.innerText = 'Successfully connected!'
                            e.style.color = 'white'
                        } else {
                            console.log('error')
                            alert('Error. Please try again')
                        }
                    },
                    { scope: 'user_posts', auth_type: 'rerequest' }
                )
            }
        })
    }
    const fetchData = async () => {
        await axios('/get_facebook', {
            params: {
                accessToken: accessToken,
            },
        })
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log('error:', err)
            })
    }

    useEffect(() => {
        setUpFacebookSDK()
    })
    useEffect(() => {
        fetchData()
    }, [accessToken])

    return (
        <div class='ToFacebook'>
            <NavLink id='back' to='/me'>
                back
            </NavLink>
            <h1>Connect to Facebook</h1>
            <hr></hr>
            <button
                id='Facebook'
                onClick={(e) => {
                    setButton(e.target)
                }}
            >
                Connect to Facebook
            </button>
        </div>
    )
}
export default ToFacebook
