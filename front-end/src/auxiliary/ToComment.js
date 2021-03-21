import './ToComment.css'
import React from 'react'


const ToComment = (props) => {

    return (
        <>
            <br></br>
            <textarea type = "text" id = "repost_edit_text"/>
            <br></br>
            <button className = "enterPost_edit">Enter</button>
        </>
    )
}
export default ToComment;