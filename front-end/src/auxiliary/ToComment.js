import './ToComment.css'
import React from 'react'


const ToComment = (props) => {

    return (
        <>
      
            <input placeholder="   write your comment here" type = "text" id = "repost_edit_text"/>
        
            <button id= "sendPost_edit">Send</button>
        </>
    )
}
export default ToComment;