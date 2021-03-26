import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Chat.css'

const Chat = (props) => {
    // start a state variable with a blank array
    const [data, setData] = useState([])


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

        axios('https://my.api.mockaroo.com/chat.json?key=2d6d6d60_')
        .then((response) => {
            // extract the data from the server response
            setData(response.data)
        })
        .catch((err) => {
            const backupData = [
                {
                    "userimg": "https://gravatar.com/avatar/3ab0a552855dd378a994d72beeaf7ed6?s=200&d=robohash&r=x",
                    "username": "Bob",
                    "time": "03/22/2021 11:00 AM",
                    "fromSender": true,
                    "content": "Hi. "
                },
                {
                    "userimg": "https://gravatar.com/avatar/412dd18bd4b3e7b5ff96752e42a767c9?s=200&d=robohash&r=x",
                    "username": "Tom",
                    "time": "03/22/2021 11:01 AM",
                    "fromSender": false,
                    "content": "Hi there. "
                },
                {
                    "userimg": "https://gravatar.com/avatar/3ab0a552855dd378a994d72beeaf7ed6?s=200&d=robohash&r=x",
                    "username": "Bob",
                    "time": "03/22/2021 11:02 AM",
                    "fromSender": true,
                    "content": "How are you? "
                },
                {
                    "userimg": "https://gravatar.com/avatar/412dd18bd4b3e7b5ff96752e42a767c9?s=200&d=robohash&r=x",
                    "username": "Tom",
                    "time": "03/22/2021 2:00 PM",
                    "fromSender": false,
                    "content": "Bye... "
                },
                {
                    "userimg": "https://gravatar.com/avatar/3ab0a552855dd378a994d72beeaf7ed6?s=200&d=robohash&r=x",
                    "username": "Bob",
                    "time": "03/22/2021 2:05 PM",
                    "fromSender": true,
                    "content": "Ok... "
                }
            ]
            setData(backupData)
        })
    }, []) // only run it once!

  return (
    <div className = "Chat">

        <div className = "Chat_title">
            <Link to = '/community' id = "back">Back</Link>
            <h2>Chat</h2>
        </div>        

        <div className = "Chat_messages">
            {data.map((item) => (
                <ChatMessages userimg = {item.userimg}
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