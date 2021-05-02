import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Community.css'
import { Search } from 'react-bootstrap-icons'
import { ChatLeftDotsFill } from 'react-bootstrap-icons'
import { At } from 'react-bootstrap-icons'
import { TextParagraph } from 'react-bootstrap-icons'
import { HeartFill } from 'react-bootstrap-icons'
import './Community.js'
import Message_History from './Message_History'

const Community = (props) => {
    // start a state variable with a blank array
    const [data, setData] = useState([])
    const [timer, setTimer] = useState(0)
    const [search_name, setSearch_name] = useState([])

    // auto refresh chat room list every 3000 ms <-- 3 seconds
    setTimeout(function () {
        if (timer === 0) {
            setTimer(1)
        } else {
            setTimer(0)
        }
    }, 3000)

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        // fetch some mock data about animals for sale
        console.log('fetching message history')

        axios('/api_message')
            .then((response) => {
                setData(response.data)
            })
            .catch((err) => {
                console.log(`couldn't get user messages`)
                console.error(err) // the server returned an error... probably too many requests... until we pay!
            })
    }, [timer])

    let unsorted = []
    let empty_chat = []
    /* 
    separate chat messages into two groups for sorting: 
        1. empty
        . non-empty <- sort on this group only
    */
    for (let i = 0; i < data.length; i++) {
        if (data[i].message_history.length === 0) {
            empty_chat.push(data[i])
        } else {
            unsorted.push(data[i])
        }
    }
    // console.log(unsorted, empty_chat)

    // fascinating bubble sort, killer of time complexity
    function bubbleSort(array, property) {
        let swapped
        do {
            swapped = false
            for (let i = 0; i < array.length - 1; i++) {
                const date1 = new Date(array[i][property][array[i][property].length - 1].time).getTime()
                const date2 = new Date(array[i + 1][property][array[i + 1][property].length - 1].time).getTime()
                // console.log("------", date1)
                // console.log("======", date2)
                if (date1 < date2) {
                    let temp = array[i]
                    array[i] = array[i + 1]
                    array[i + 1] = temp
                    swapped = true
                }
            }
        } while (swapped)
    }

    bubbleSort(unsorted, 'message_history')
    // console.log("sorted!", unsorted)

    // append the empty_chat to the sorted `unsorted` array
    unsorted.push(...empty_chat)

    console.log(unsorted)
    console.log("search_name: ", search_name)

    let searched_chat_room
    if (search_name != null && search_name != undefined && search_name != '' && search_name != []) {
        searched_chat_room = unsorted.filter((element) => {
            return element.chatroom_name.includes(search_name)
        })
    } else {
        searched_chat_room = unsorted
    }

    return (
        <div className='Community'>
            <h1>Message</h1>
            <Link to={'/create_new_chat'}>
                <ChatLeftDotsFill id='chat' size={17} />
            </Link>
            <div className='main-content'>
                <Link class='icon' to={'/mentions'}>
                    <At id='mention-icon' size={30} color='white' />
                    <p id='mentions'>Mentions</p>
                </Link>
                <Link class='icon' to={'/comments'}>
                    <TextParagraph id='comment-icon' size={30} color='white' />
                    <p id='comments'>Comments</p>
                </Link>

                <Link class='icon' to={'/likes'}>
                    <HeartFill id='like-icon' size={30} color='white' />
                    <p id='likes'>Likes</p>
                </Link>
            </div>

            <div>
                <input id='search' type='search' placeholder='Search by group name' value={search_name} onInput={(e) => setSearch_name(e.target.value)} />
                <Search id='search_icon' color='grey' size={17} />
            </div>

            <section className='message_list'>
                {searched_chat_room.map((item) => (
                    <Message_History key={item.id} details={item} />
                ))}
            </section>
        </div>
    )
}

export default Community
