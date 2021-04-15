import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Message_History.css'
import axios from 'axios'

const Message_History = (props) => {
  // console.log(props);
  let newest_message_date, newest_message, chatroom_avatar, chatroom_name
  const [self_username, Set_self_username] = useState("")
  const messages = props.details.message_history

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  if (!isEmpty(messages)) {
    console.log("messages", messages[messages.length - 1])
    newest_message_date = messages[messages.length - 1].time
    newest_message = messages[messages.length - 1].content
  }

    // retrieve current user info from backend
    useEffect(() => {
      axios("/user")
      .then((response) => {
          console.log(response.data)
          Set_self_username(response.data.username)
      })
  }, [])

  const avatar_list = props.details.chatroom_avatar
  const name_list = props.details.chatroom_name
  const index = self_username === name_list[0] ? 1 : 0
  console.log(self_username)
  chatroom_avatar = avatar_list.length === 1 ? avatar_list[0] : avatar_list[index]
  chatroom_name = name_list.length === 1 ? name_list[0] : name_list[index]

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
              <img class='inline-block' id='avatar' src={chatroom_avatar} />
              <span class='inline-block' id='username' >{chatroom_name}</span>
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
