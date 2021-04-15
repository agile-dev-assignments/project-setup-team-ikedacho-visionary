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
    const [timer, setTimer] = useState(0)

    // refresh messages every 3000ms --> 3 seconds
    setTimeout(function(){
        if (timer === 0) {
            setTimer(1)
        } else {
            setTimer(0)
        }
    }, 3000);

    const [userData, setUserData] = useState([
        {
            username: "",
            userimg: "",
            content: newMessage
    }])
    
    const [self_username, Set_self_username] = useState("")

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

    // retrieve current user info from backend
    useEffect(() => {
        axios("/user")
        .then((response) => {
            console.log(response.data)
            Set_self_username(response.data.username)
        })
    }, [])

    const submitMessage = (e) => {
        userData.content = newMessage;
        console.log(userData) 

        axios
        .post("/api_send_new_message", {
            roomID: state.roomID, 
            text: userData.content, 
            userimg: userData.userimg, 
        })
        .then((response) => {
            if (response.data !== "Sent") {
                console.log(response.data)
            }
        })
        .catch((err) => {
            console.log(err)
        })

        e.preventDefault();
        // clearing the values
        setNewMessage("")
    }

    const goTOPreviousPath = () => {
        history.goBack()
    }

   
    // nested component
    const ChatMessages = (props) => {

        let fromSender = (self_username !== props.username)

        return (
            <>  
                {fromSender && (
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

                {!fromSender && (
                    <div className = "Chat_from_self">
                        <Link to = {{
                            pathname: '/my_profile', }
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
        axios
            .get('/api_chat_messages', {
                params: {
                    roomID: state.roomID
                }
            })
            .then((response) => {
                // extract the data from the server response
                console.log("response.data:", response.data)
                setData(response.data.message_history)
                console.log("data: ", data)
            })
            .catch((err) => {
                /*  */
            })
    }, [timer]) 

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
                        content = {item.content} />
                ))}
            </div>

            <div className = "Chat_user_input">
                <form>
                    <input className = "Chat_user_input" type = "text" placeholder = "Something to say..." 
                           value = {newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
                    <button className = "Chat_user_input" type = "submit" onClick={submitMessage}>Enter</button>
                </form>
            </div>

        </div>
    )
}

export default Chat