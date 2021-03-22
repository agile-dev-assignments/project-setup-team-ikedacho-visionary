import './ToComment.css'

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ToComment = (props) => {
    const [show, setShow] = useState('true')
    const [currentTime, setCurrentTime] = useState('')

    const handleClick=()=>{
        console.log('clicked!')
        setShow(!show);
    
        setCurrentTime(new Date());
    }




    return (
        < >
        
            <input id = "repost_edit_text" style={{ display: show ? "block" : "none" }} placeholder="   write your comment here" type = "text" / >
        
            <button id= "sendPost_edit" onClick={handleClick} style={{ display: show ? "block" : "none" } }>Send</button>
        
        
        <div id='mycomment' style={{ display: !show ? "block" : "none" }}>
            <div style={{ display: !show ? "block" : "none" }}>
           
                <Link onClick={() => window.location.href = '/my_profile'} to = {'/my_profile'}>
                    <span id='username' >Joe:</span>
                    
                </Link>
                my comments
            </div>
           
        </div>
        <div id='date_send' style={{ display: !show ? "block" : "none" }}>
            { currentTime.toLocaleString() }
        </div>
        </>
    )
}
export default ToComment;
