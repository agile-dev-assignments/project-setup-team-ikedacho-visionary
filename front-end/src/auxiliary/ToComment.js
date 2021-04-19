import './ToComment.css'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ToComment = (props) => {
    let history = useHistory()
    const [show, setShow] = useState('true')
    const [currentTime, setCurrentTime] = useState('')

    //represnet if the send button is clicked. false: not clicked. true: clicked
    const [send, setSend] = useState(false)
    let [comment_text, setComment_text] = useState('')

    const goTOPreviousPath2 = () => {
        setSend(!send)

        // setComment_text('my comment_text')
        console.log('send:', send)
        console.log('comment_text:', comment_text)
        comment_text = document.getElementById('myTextarea_ToComment').value
        console.log(comment_text)
        console.log('clicked!')
        if (comment_text !== '') {
            setShow(!show)
        }

        setCurrentTime(new Date())
    }

    return (
        <>
            <textarea style={{ display: show ? 'block' : 'none' }} id='myTextarea_ToComment' placeholder=" What's your comment?" onInput={(e) => setComment_text(e.target.value)} />

            <button id='sendPost_edit' onClick={goTOPreviousPath2} style={{ display: show ? 'block' : 'none' }}>
                Send
            </button>

            <div id='mycomment' style={{ display: !show ? 'block' : 'none' }}>
                <div style={{ display: !show ? 'block' : 'none' }}>
                    <Link onClick={() => (window.location.href = '/my_profile')} to={'/my_profile'}>
                        Joe:
                    </Link>
                    {comment_text}
                </div>
            </div>
            <div id='date_send' style={{ display: !show ? 'block' : 'none' }}>
                {currentTime.toLocaleString()}
            </div>
        </>
    )
}
export default ToComment
