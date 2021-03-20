import React from 'react'
import { Link } from 'react-router-dom'
import './Message_History.css'

const Message_History = (props) => {
  // console.log(props);

  return (
    <article className="Message_History">
        <Link to={`/chat}`}>
            <div>
                <img class='inline-block' id='avatar' src={props.details.user_photo} />
                <h1 class='inline-block' id='username' >{props.details.username}</h1>
                <span id="newest_message_date">{props.details.newest_message_date}</span>
                <span id="unread_message_number">{props.details.unread_message_number}</span>
                <div id='newest_message'>{props.details.newest_message}</div>
            </div>
       
        </Link>

        

    </article>
  )
}

// make this function available to be imported into another module
export default Message_History
