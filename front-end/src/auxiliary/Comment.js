import React from 'react'
import './Comment.css'

const Comment = (props) => {

  return (
    <div class="Comment">
        <img class="img" src={props.img} />
        <div class="Text">
        <strong class = "username">{props.UserName}</strong>
        <p class = "content">{props.content}</p>
        <div class="Footer">
            <div id="datetime">{props.Senttime}</div>
            <div class = "actions">            
            <button class = "Reply"> Reply</button>
            <button class = "Like"> Like</button>
            </div>
            </div>
        </div>
    </div>
  )
}



export default Comment
