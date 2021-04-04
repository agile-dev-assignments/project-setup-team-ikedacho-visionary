import React from 'react'
import { Link } from 'react-router-dom'
import './Message_History.css'

const Message_History = (props) => {
  // console.log(props);

  return (
    <article className="Message_History">
      <div id='message'>
        <p id='message_text' >
            {/* 
            // Commented out by Xinyu-bot: 
            // should not allow user to jump to other users' profile pages from here
            <Link to = {{
              pathname: '/friend_profile', 
              state: {
                  UserName: props.details.username, 
                  userimg: props.details.user_photo
              }}}>
              <img class='inline-block' id='avatar' src={props.details.user_photo} />
            </Link>
          */}

            <Link to = {{
              pathname: '/chat', 
              state: {
                roomID: props.details.roomID
              }}
              }>
              <img class='inline-block' id='avatar' src={props.details.user_photo} />
              <span class='inline-block' id='username' >{props.details.username}</span>
              <span id="newest_message_date">{props.details.newest_message_date}</span>
              <br></br>
              <span id="unread_message_number">{props.details.unread_message_number}</span>
              <div id='newest_message'>{props.details.newest_message}</div>
            </Link>
        </p>
      </div>
    </article>
  )
}

// make this function available to be imported into another module
export default Message_History
