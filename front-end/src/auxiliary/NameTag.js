import React from 'react'
import './NameTag.css'

const NameTag = (props) => {

    // replace by API to follow/unfollow
    const follow_button = e => {
        alert("follow_button is clicked! ")
        }

  return (
    <div className = "NameTag">
        <img className = "img" src = {props.img} />
        <div className = "Text">
            <strong className = "username">{props.UserName}</strong>
            <button className = "follow" onClick = {follow_button}>{props.action}</button>
            <p className = "bio">Bio: {props.bio}</p>
        </div>
    </div>
  )
}

export default NameTag
