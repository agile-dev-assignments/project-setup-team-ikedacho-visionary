import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './NewChat.css'
import { createBrowserHistory } from "history";

const NewChat = (props) => {
    // start a state variable with a blank array
    const [data, setData] = useState([])
    const history = createBrowserHistory({forceRefresh:true})

    let selectedList = {
                        user: []
                    }

    // nested component
    const NewChatSelection = (props) => {
        const [select, setSelect] = useState({
            selected: false
        })
        const _setSelect = (e) => {
            let cur = select.selected
            setSelect({
                selected: !cur
            });

            // green(#00FF00) if selected
            cur ? e.target.style.backgroundColor = '#e7e7e7' : e.target.style.backgroundColor = '#00FF00'
        };

        // update selected list
        if (select.selected) {
            selectedList.user.push(props)
        } else {
            selectedList.user = selectedList.user.filter(item => item !== props)
        }

        // weird behavior here: props Obj gets pushed into the array twice continuously
        selectedList.user = [...new Set(selectedList.user)]

        return (
            <div>
                <div className = "NewChatSelection">
                    <img className = "NewChatSelection_userimg" src = {props.userimg} />
                    <button className = "NewChatSelection_select_button" onClick = {_setSelect.bind()}>
                        {select.selected ? "Selected" : "Select"}
                    </button>
                    <p className = "NewChatSelection_username">{props.username}</p>
                </div>
            </div>
        )
    }

    const _handleCreate = (event) => {
        event.preventDefault()
        let roomID, self_userimg
        
        if (selectedList.user.length === 0) {
            alert("Sorry, you cannot create chat room with 0 person! ")
            return
        }

        axios
        .get('/api_create_new_chat_roomID', {
            params: {
                participantsList: selectedList
            }
        })
        .then((response) => {
            // fetch room ID from backend
            roomID = response.data
            // jump to the chat room with `roomID`
            history.push({
                pathname: '/chat', 
                state: {
                    roomID: roomID
                }
            })
        })
        .catch((err) => {

        })
        
        
    }

    // the following side-effect will be called once upon initial render
    useEffect(() => {

        axios('/api_create_new_chat_list')
        .then((response) => {
            // extract the data from the server response
            setData(response.data)
        })
        .catch((err) => {
            /*
            const backupData = [{"username":"ccamus0","userimg":"https://robohash.org/quiaperferendisquis.jpg?size=50x50\u0026set=set1"},{"username":"krantoul1","userimg":"https://robohash.org/etquisit.jpg?size=50x50\u0026set=set1"},{"username":"omccourt2","userimg":"https://robohash.org/velitinvel.png?size=50x50\u0026set=set1"},{"username":"tbagnold3","userimg":"https://robohash.org/isteineligendi.png?size=50x50\u0026set=set1"},{"username":"tlievesley4","userimg":"https://robohash.org/quasiautenim.bmp?size=50x50\u0026set=set1"},{"username":"rstockton5","userimg":"https://robohash.org/teneturprovidentpraesentium.jpg?size=50x50\u0026set=set1"},{"username":"apetren6","userimg":"https://robohash.org/impeditporrout.png?size=50x50\u0026set=set1"},{"username":"dmcmains7","userimg":"https://robohash.org/dictapossimusquis.bmp?size=50x50\u0026set=set1"},{"username":"neuler8","userimg":"https://robohash.org/suscipitquiillum.bmp?size=50x50\u0026set=set1"},{"username":"eclemenza9","userimg":"https://robohash.org/abvoluptatemsit.jpg?size=50x50\u0026set=set1"}
            ]
            setData(backupData)*/
        })
    }, []) // only run it once!

  return (
    <div className = "NewChat">
        <div className = "NewChat_back">
            <Link to = '/community' id="back">Back</Link>
        </div>

        <div className = "NewChat_create">
            <Link onClick = {_handleCreate.bind()}>Create</Link>
        </div>

        <h3 className = "NewChat_title">Create New Chat</h3>

        <section className = "NewChat">
            {data.map((item) => (
                <>
                    <NewChatSelection 
                        key={item.id}
                        username = {item.username}
                        userimg = {item.userimg} />
                </>
            ))}
        </section>

    </div>
  )
}

export default NewChat