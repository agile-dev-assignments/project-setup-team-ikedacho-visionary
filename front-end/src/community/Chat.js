import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Chat.css'
import { useHistory, useLocation } from 'react-router-dom'

const Chat = (props) => {
    // start a state variable with a blank array
    const [data, setData] = useState([])
    const history = useHistory()
    const {state} = useLocation()
    const [newMessage, setNewMessage] = useState("")

    const [userData, setUserData] = useState([
        {
            username: "",
            userimg: "",
            content: newMessage
    }])
    
    useEffect(() => {

        axios("/my_info")
        .then((response) => {
          // extract the data from the server response
          setUserData(
          { userimg : response.data.user_photo,
            username : response.data.user_name,
            content: newMessage}
        )})
        .catch((err) => {
          console.log(`Can not get user info`)
        })
        }, []) // only run it once!

   
     const submitMessage  = () => {
        userData.content = newMessage;
        console.log(userData)

     }

    const goTOPreviousPath = () => {
        history.goBack()
    }

   
    // nested component
    const ChatMessages = (props) => {

        return (
            <>  
                {props.fromSender && (
                    <div className = "Chat_from_others">
                        <Link to = {{
                            pathname: '/friend_profile', 
                            state: {
                                UserName: props.username, 
                                userimg: props.userimg
                            }}
                        }>                        
                            <img className = "Chat_avatar" src = {props.userimg}/>
                        </Link>
                        <p>{props.username}</p>
                        <p>{props.time}</p>
                        <p className = "Chat_from_others">{props.content}</p>
                    </div>
                )}

                {!props.fromSender && (
                    <div className = "Chat_from_self">
                        <Link to = {{
                            pathname: '/my_profile', 
                            /*
                            For my_profile page, we probably don't need to pass in param
                            But for structural purposes, state: {} will remain here until the final launch
                            state: {
                                UserName: props.username, 
                                userimg: props.userimg
                            }
                            */}
                        }> 
                            <img className = "Chat_avatar" src = {props.userimg} />
                        </Link>
                        <p>{props.time}</p>
                        <p className = "Chat_from_self">{props.content}</p>
                    </div>
                )}
            </>
        )
    }

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        // 'https://my.api.mockaroo.com/chat.json?key=2d6d6d60'
        axios
            .get('/api_chat_messages', {
                params: {
                    roomID: state.roomID
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
                <Link onClick = {() => goTOPreviousPath()} id = "back">Back</Link>
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
                <input className = "Chat_user_input" type = "text" onChange={(e) => setNewMessage(e.target.value)}/>
                <button className = "Chat_user_input" onClick={submitMessage.bind()}>Enter</button>
            </div>

        </div>
    )
}

export default Chat