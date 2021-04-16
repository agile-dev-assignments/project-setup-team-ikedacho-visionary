import React, { useState, useEffect } from 'react'
import './Me.css'
import { Link } from 'react-router-dom'
import { PersonPlus } from 'react-bootstrap-icons'
import { Gear } from 'react-bootstrap-icons'
import { ClockHistory } from 'react-bootstrap-icons'
import { TextParagraph } from 'react-bootstrap-icons'
import { HeartFill } from 'react-bootstrap-icons'

import axios from 'axios'
import Linked_platform_connect from './Linked_platform_connect'
import Unconnected_social_media from './Unconnected_social_media'

const Me = (props) => {
    //set user_info
    const [user_info, setUser_info] = useState([])
    //set linked_social_media
    let [linked_social_media, setLinked_social_media] = useState([])
    let [clicked_linked_social_media, SetClicked_linked_social_media] = useState([])

    let [unconnected_social_media, setUnconnected_social_media] = useState([])
    let [clicked_unconnected_social_media, SetClicked_unconnected_social_media] = useState([])

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
    const handleClick_Unconnected = (response) => {
        let elements = document.getElementsByTagName('BUTTON')
        console.log('elements of BUTTON:', elements)
        console.log('elements.length:', elements.length)

        //deal with unconnected social media
        for (let i = response.data.linked_social_media.length; i < elements.length; i++) {
            let element = elements[i]
            if (element.id === 'Facebook') {
                element.style.background = '#3b5998'
                element.style.color = 'white'
                //element.style.backgroundRepeat = 'no-repeat'
                //element.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6I2ZmZmZmZjsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTEyNS41OTU4Myw2NC41aC0yNS4yNjI1di0xNC4zMzMzM2MwLC03LjM5NiAwLjYwMiwtMTIuMDU0MzMgMTEuMjAxNSwtMTIuMDU0MzNoMTMuMzg3MzN2LTIyLjc5Yy02LjUxNDUsLTAuNjczNjcgLTEzLjA2NDgzLC0xLjAwMzMzIC0xOS42MjIzMywtMC45ODljLTE5LjQ0MzE3LDAgLTMzLjYzMzE3LDExLjg3NTE3IC0zMy42MzMxNywzMy42NzYxN3YxNi40OTA1aC0yMS41djI4LjY2NjY3bDIxLjUsLTAuMDA3MTd2NjQuNTA3MTdoMjguNjY2Njd2LTY0LjUyMTVsMjEuOTczLC0wLjAwNzE3eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')"
                element.addEventListener('click', () => {
                    window.location.href = '/to_facebook'
                })
            }
        }
    }
    const LoginStatus_fb = async () => {
        window.FB.getLoginStatus(function (response) {
            console.log(response)
            if (response.status === 'connected') {
                console.log('User already logged in Facebook and autenticated')
                SetClicked_unconnected_social_media('Facebook')
            } else {
                console.log('user not logged in FB')
                SetClicked_linked_social_media('Facebook')
            }
        })
    }
    const fetchData = async () => {
        await axios('/get_me', {
            params: {
                clicked_linked_social_media: clicked_linked_social_media,
                clicked_unconnected_social_media: clicked_unconnected_social_media,
            },
        })
            .then((response) => {
                setUser_info(response.data.user_info)
                setLinked_social_media(response.data.linked_social_media)
                console.log('linked', response.data.linked_social_media)
                setUnconnected_social_media(response.data.unconnected_social_media)
                console.log('unconnected', response.data.unconnected_social_media)
                LoginStatus_fb()
                handleClick_Unconnected(response)
            })
            .catch((err) => {
                console.log('error:', err)
            })
    }
    useEffect(() => {
        setUpFacebookSDK()
    })
    useEffect(() => {
        setUpFacebookSDK()
        fetchData()
    }, [clicked_linked_social_media, clicked_unconnected_social_media])

    return (
        <div className='Me'>
            <section id='header'>
                <Link to={'/friend_suggestion'}>
                    <PersonPlus id='addFriend' color='black' size={17} />
                </Link>

                <h1>Me</h1>

                <Link to={'/settings'}>
                    <Gear id='setting' color='black' size={17} />
                </Link>
            </section>
            <section id='main_container1'>
                <Link to='/my_profile'>
                    <div>
                        <p id='message_text'>
                            <img class='inline-block' id='avatar' src={user_info.user_photo} />
                            <span class='inline-block' id='username'>
                                {user_info.user_name}
                            </span>
                            <div id='bio'>{user_info.bio}</div>
                        </p>
                    </div>
                </Link>

                <div id='post_follow'>
                    <Link id='button' to='/my_profile'>
                        {user_info.post_number}
                        <br></br>
                        Posts
                    </Link>

                    <Link
                        id='button'
                        to={{
                            pathname: '/followers',
                            state: {
                                UserName: user_info.user_name,
                            },
                        }}
                    >
                        {user_info.follower_number}
                        <br></br>
                        Followers
                    </Link>

                    <Link
                        id='button'
                        to={{
                            pathname: '/followings',
                            state: {
                                UserName: user_info.user_name,
                            },
                        }}
                    >
                        {user_info.following_number}
                        <br></br>
                        Following
                    </Link>
                </div>
            </section>

            <section id='main_container2'>
                <Link class='icon' to={'/liked'}>
                    <HeartFill id='browse_history_icon' size={30} color='white' />
                    <p id='liked'>Liked</p>
                </Link>
                <Link class='icon' to={'/my_comment_history'}>
                    <TextParagraph id='browse_history_icon' size={30} color='white' />
                    <p id='commented'>Commented</p>
                </Link>

                <Link class='icon' to={'/browse_history'}>
                    <ClockHistory id='browse_history_icon' size={30} color='white' />
                    <p id='browse_history'>Browse History</p>
                </Link>
            </section>

            <section>
                <h1>Connected Social Media</h1>

                <div id='main_container3'>
                    {linked_social_media.map((item, i) => (
                        <Linked_platform_connect key={item.id} details={item} />
                    ))}
                </div>
                <h1>Unconnected Social Media</h1>
                <div id='main_container3'>
                    {unconnected_social_media.map((item, i) => (
                        <Unconnected_social_media key={item.id} details={item} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Me
