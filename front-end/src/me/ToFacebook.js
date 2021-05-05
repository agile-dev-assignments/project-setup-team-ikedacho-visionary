import React, { useState, useEffect } from 'react'
import './ToFacebook.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
const ToFacebook = (props) => {
    let history = useHistory()

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
        window.FB.login(
            function (response) {
                // handle the response
                console.log(response)

                let accessToken = response.authResponse.accessToken
                console.log(accessToken)
                setAccessToken(accessToken)
                // modify the facebook element.
                e.style.background = '#3b5998'

                e.style.color = 'white'
            },
            { scope: 'user_posts', auth_type: 'rerequest' }
        )
    }
    const fetchData = async () => {
        await axios('/get_facebook', {
            params: {
                accessToken: accessToken,
            },
        })
            .then((response) => {
                console.log(response)
                alert('Successfully connect to Facebook!')
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
                }
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
