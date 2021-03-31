import React from 'react'
import './NameTag.css'
import {Link} from "react-router-dom";

const NameTag = (props) => {

    // replace by API to follow/unfollow
    const follow_button = e => {
        alert("follow_button is clicked! ")
        }

  return (
    <div className = "NameTag">
        <Link to = {{
            pathname: '/friend_profile', 
            state: {
                UserName: props.UserName, 
                userimg: props.img
            }}
        }>
            <img className = "img" src = {props.img} />
        </Link>
        <div className = "Text">
            <strong className = "username">{props.UserName}</strong>
            <button className = "follow" onClick = {follow_button}>{props.action}</button>
            <p className = "bio">Bio: {props.bio}</p>
        </div>
    </div>
  )
}

export default NameTag
