import React, { useState, useEffect } from 'react'
import './NameTag.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const NameTag = (props) => {
    let history = useHistory()
    const setButton = async (e) => {
        if (e.className === 'Follow') {
            axios('/get_add_friend', {
                params: {
                    clicked_follow_username: e.id,
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        setTimeout(() => {
                            window.location.reload(false)
                        }, 500)
                    }
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
        } else {
            axios('/get_remove_friend', {
                params: {
                    clicked_unfollow_username: e.id,
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        setTimeout(() => {
                            window.location.reload(false)
                        }, 500)
                    }
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
    }

    return (
        <div className='NameTag'>
            <Link
                to={{
                    pathname: '/friend_profile',
                    state: {
                        UserName: props.UserName,
                        userimg: props.img,
                    },
                }}
            >
                <img className='img' src={props.img} />
            </Link>
            <div className='Text'>
                <strong className='username'>{props.UserName}</strong>
                <button
                    className={props.action}
                    id={props.UserName}
                    onClick={(e) => {
                        setButton(e.target)
                    }}
                >
                    {props.action}
                </button>
                <p className='bio'>Bio: {props.bio}</p>
            </div>
        </div>
    )
}

export default NameTag
