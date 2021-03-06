import './ToComment.css'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ToComment = (props) => {
    let history = useHistory()
    const [show, setShow] = useState('true')
    const [currentTime, setCurrentTime] = useState('')
    const [username, setUsername] = useState('')
    //represnet if the send button is clicked. false: not clicked. true: clicked
    const [send, setSend] = useState(false)
    let [comment_text, setComment_text] = useState('')

    const goTOPreviousPath2 = () => {
        console.log('0send', send)
        setSend(!send)

        // setComment_text('my comment_text')
        console.log('1send:', send)
        console.log('comment_text:', comment_text)
        comment_text = document.getElementById('myTextarea_ToComment').value
        console.log(comment_text)
        console.log('clicked!')
        if (comment_text !== '') {
           
            axios
                .get('/get_send_comment', {
                    params: {
                        comment_text: comment_text,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data)
                        setUsername(response.data)
                        setShow(!show)
                        setCurrentTime(new Date())
                        console.log('send', send)
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        if (error.response.status === 501) {
                            console.log('Error 501: user is not login; req.user does not exist')
                            alert('You are not logged in. Please log in and try again!')
                            history.push('/login')
                            setTimeout(() => {
                                window.location.href = window.location.href
                            }, 100)
                        }
                    }
                })
        }
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
                        {username}:
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
