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
                        history.push('/login')
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

            <p>According to Facebook API policy, in this development phase, only Facebook account that is added as a tester/administrator to this app can use Facebook API to access your Facebook post data in this app. Please contact us to add you to tester of our app so that O-Zone can correctly connect to your Facebook account. You can send us your Facebook username in Slack or contact lh2510@nyu.edu. As soon as we add you to testers, we will notify you and then you can use this Facebook login button to give permission to O-Zone to access your Facebook post data.</p>
        </div>
    )
}
export default ToFacebook
