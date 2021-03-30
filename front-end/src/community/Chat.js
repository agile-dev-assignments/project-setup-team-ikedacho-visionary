import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Chat.css'
import { useHistory, useLocation } from 'react-router-dom'

const Chat = (props) => {
    // start a state variable with a blank array
    const [data, setData] = useState([])
    const history = useHistory()
    const {state} = useLocation();

    // go back to the previous page
    const goTOPreviousPath = () => {
        history.goBack()
    }

    // nested component
    const ChatMessages = (props) => {

        return (
            <>  
                {props.fromSender && (
                    <div className = "Chat_from_others">
                        <img className = "Chat_avatar" src = {props.userimg} 
                             onClick={() => window.location.href = '/friend_profile'}/>
                        <p>{props.username}</p>
                        <p>{props.time}</p>
                        <p className = "Chat_from_others">{props.content}</p>
                    </div>
                )}

                {!props.fromSender && (
                    <div className = "Chat_from_self">
                        <img className = "Chat_avatar" src = {props.userimg} 
                             onClick={() => window.location.href = '/my_profile'} />
                        <p>{props.time}</p>
                        <p className = "Chat_from_self">{props.content}</p>
                    </div>
                )}
            </>
        )
    }

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        // 'https://my.api.mockaroo.com/chat.json?key=2d6d6d60_'
        axios
            .get('/api_chat_messages', {
                params: {
                    user_name: state.user_name,
                    user_photo: state.user_photo
                }
            })
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                /*  */
            })
    }, []) // only run it once!

  return (
    <div className = "Chat">

        <div className = "Chat_title">
            <Link onClick = {() => goTOPreviousPath()}>Back</Link>
            <h2>Chat</h2>
        </div>        

        <div className = "Chat_messages">
            {data.map((item) => (
                <ChatMessages
                    key={item.id}
                    userimg = {item.userimg}
                    username = {item.username}
                    time = {item.time}
                    fromSender = {item.fromSender}
                    content = {item.content} />
            ))}
        </div>

        <div className = "Chat_user_input">
            <input className = "Chat_user_input" type = "text"></input>
            <button className = "Chat_user_input">Enter</button>
        </div>

    </div>
  )
}

export default Chat