import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Edit.css'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import Post_picture from '../me/Post_picture'
import { ChevronLeft } from 'react-bootstrap-icons'
const Edit = (props) => {
    const [state, setState] = useState({
        showComment: false,
    })

    const _showComment = () => {
        let cur = state.showComment
        setState({
            showComment: !cur,
        })
    }

    const [show, setShow] = useState(false)
    //represnet if the send button is clicked. false: not clicked. true: clicked
    const [send, setSend] = useState(false)
    const [post_text, setPost_text] = useState('')

    let history = useHistory()

    const goTOPreviousPath = () => {
        history.goBack()
    }

    const goTOPreviousPath2 = (e) => {
        setSend(!send)
        setPost_text('my post text')
        console.log('send:', send)
        console.log('post_text:', post_text)
        document.getElementById('myTextarea').value = post_text
        console.log(post_text)

        if (post_text !== '') {
            axios.get('/get_edit', {
                //send along the post_text user typed
                params: {
                    post_text: post_text,
                },
            })
            history.goBack()
            setTimeout(() => {
                window.location.href = window.location.href
            }, 100)
        } else {
            alert('You need to write some text')
            e.preventDefault()
        }
    }

    const _setShow = () => {
        console.log(show)
        setShow(!show)
    }

    return (
        <div className='edit'>
            <section id='header'>
                <Link onClick={goTOPreviousPath}>
                    <ChevronLeft id='back' color='black' size={17} />
                </Link>
                <h1>New Post</h1>
                <button
                    onClick={(e) => {
                        goTOPreviousPath2(e)
                    }}
                    id='send_button'
                >
                    send
                </button>
                <hr></hr>
            </section>

            <section className='edit-wrap'>
                <textarea id='myTextarea' placeholder="What's you mind?" onInput={(e) => setPost_text(e.target.value)} />

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                {/*<button className = "Commentbutton" onClick = {_showComment.bind()}>Upload picture</button>*/}
                {state.showComment && <>{<Post_picture />}</>}

                <div className='post'>
                    <span onClick={_setShow}>Post to ▼️ </span>
                    <div className='post-checkbox' style={{ opacity: show ? 1 : 0 }}>
                        <label>
                            <input name='post' type='checkbox' checked /> O-Zone
                        </label>
                        <label>
                            <input name='post' type='checkbox' />
                            Facebook{' '}
                        </label>
                        <label>
                            <input name='post' type='checkbox' />
                            Twitter
                        </label>
                        <label>
                            <input name='post' type='checkbox' />
                            Instagram
                        </label>
                    </div>
                </div>

                <div className='checkbox'>
                    <input type='checkbox' />
                    <span>Post as Pravite</span>
                </div>
            </section>
        </div>
    )
}

export default Edit
