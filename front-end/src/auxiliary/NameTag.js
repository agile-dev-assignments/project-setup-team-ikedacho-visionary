import React, { useState, useEffect } from 'react'
import './NameTag.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const NameTag = (props) => {
    // replace by API to follow/unfollow

    const setButton = (e) => {
        if (e.className === 'Follow') {
            alert('Follow_button is clicked! ')

            axios('/get_add_friend', {
                params: {
                    clicked_follow_username: e.id,
                },
            })
        } else {
            alert('Unfollow_button is clicked! ')

            axios('/get_remove_friend', {
                params: {
                    clicked_unfollow_username: e.id,
                },
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
