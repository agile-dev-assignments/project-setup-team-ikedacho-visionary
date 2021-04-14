import React from 'react'
import { Link } from 'react-router-dom'
import './Message_History.css'

const Message_History = (props) => {
  // console.log(props);

  return (
    <article className="Message_History">
      <div id='message'>
        <p id='message_text' >
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
              {props.details.unread_message_number > 0 && <span id="unread_message_number">{props.details.unread_message_number}</span>}
              <div id='newest_message'>{props.details.newest_message}</div>
            </Link>
        </p>
      </div>
    </article>
  )
}

// make this function available to be imported into another module
export default Message_History
