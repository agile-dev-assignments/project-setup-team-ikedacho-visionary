import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Community.css'
import { Search } from 'react-bootstrap-icons';
import { ChatLeftDotsFill } from 'react-bootstrap-icons';
import { At } from 'react-bootstrap-icons';
import { TextParagraph } from 'react-bootstrap-icons';
import { HeartFill } from 'react-bootstrap-icons';
import './Community.js'
import Message_History from './Message_History'



const Community = (props) => {
    // start a state variable with a blank array
    const [data, setData] = useState([])
    const [timer, setTimer] = useState(0)

    setTimeout(function(){
        if (timer === 0) {
            setTimer(1)
        } else {
            setTimer(0)
        }
    }, 3000);

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        // fetch some mock data about animals for sale
        console.log('fetching message history')

        axios("/api_message")
        .then(response => {
            setData(response.data);
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
    for (let i = 0; i < data.length; i ++) {
        if (data[i].message_history.length === 0) {
            empty_chat.push(data[i])
        } else {
            unsorted.push(data[i])
        }
    }
    console.log(unsorted, empty_chat)

    // fascinating bubble sort, killer of time complexity
    function bubbleSort(a, par) {
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < a.length - 1; i++) {
                // console.log("------", new Date(a[i][par][a[i][par].length - 1].time).getTime())
                // console.log("======", new Date(a[i + 1][par][a[i + 1][par].length - 1].time).getTime())
                if (new Date(a[i][par][a[i][par].length - 1].time).getTime() < new Date(a[i + 1][par][a[i + 1][par].length - 1].time).getTime()) {
                    let temp = a[i];
                    a[i] = a[i + 1];
                    a[i + 1] = temp;
                    swapped = true;
                }
            }
        } while (swapped);
    }

    bubbleSort(unsorted, "message_history")
    // console.log("sorted!", unsorted)

    unsorted.push(... empty_chat)

    return (
        <div className = "Community">
            <h1>Message</h1>
            <Link to={'/create_new_chat'}> 
                <ChatLeftDotsFill id="chat" size={17}/> 
            
            </Link>
            <div className = "main-content">
                
                <Link class='icon' to={'/mentions'}> 
                <At id='mention-icon' size={30} color="white"/>
                        <p id="mentions">
                            Mentions
                        </p>
                </Link>
                <Link class='icon' to={'/comments'}>
                    <TextParagraph id='comment-icon' size={30} color="white"/>
                        <p id="comments" >
                            Comments
                        </p>
                </Link>

                <Link class='icon' to={'/likes'}>
                    <HeartFill id='like-icon' size={30} color="white"/>
                        <p id="likes">
                            Likes
                        </p>
                </Link>
            </div>

            <div >
                <input id="search" placeholder="  Search here">
                </input>
                <Search id='search_icon' color="grey" size={17} />
                
            </div>

            <section className = "message_list">
                {unsorted.map((item) => (
                    <Message_History key={item.id} details={item} />
                ))}
            </section>
        </div>

        
    );
}

export default Community;