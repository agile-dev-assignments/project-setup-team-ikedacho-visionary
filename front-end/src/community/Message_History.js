import React from 'react'
import { Link } from 'react-router-dom'
import './Message_History.css'

const Message_History = (props) => {
  // console.log(props);
  let newest_message_date, newest_message
  const messages = props.details.message_history

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  if (!isEmpty(messages)) {
    console.log("messages", messages[messages.length - 1])
    newest_message_date = messages[messages.length - 1].time
    newest_message = messages[messages.length - 1].content
  }


  return (
    <article className="Message_History">
      <div id='message'>
        <p id='message_text' >
            <Link to = {{
              pathname: '/chat', 
              state: {
                roomID: props.details._id
              }}
              }>
              <img class='inline-block' id='avatar' src={props.details.chatroom_avatar} />
              <span class='inline-block' id='username' >{props.details.chatroom_name}</span>
              <span id="newest_message_date">{newest_message_date}</span>
              <br></br>
              {/*props.details.unread_message_number > 0 && <span id="unread_message_number">{props.details.unread_message_number}</span>*/}
              <div id='newest_message'>{newest_message}</div>
            </Link>
        </p>
      </div>
    </article>
  )
}

// make this function available to be imported into another module
export default Message_History
