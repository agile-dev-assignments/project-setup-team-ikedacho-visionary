import React from 'react'
import './NameTag.css'

const NameTag = (props) => {

    // replace by API to follow/unfollow
    const login_button = e => {
        alert("Following is clicked! ")
        }

  return (
    <div className = "NameTag">
        <img className = "img" src = {props.img} alt = {props.name}/>
        <div className = "Text">
            <strong className = "username">{props.UserName}</strong>
            <p className = "content">{props.content}</p>
            <p className = "bio">Bio: {props.bio}</p>
            <button className = "follow" onClick = {login_button}>{props.action}</button>
        </div>
    </div>
  )
}



export default NameTag
