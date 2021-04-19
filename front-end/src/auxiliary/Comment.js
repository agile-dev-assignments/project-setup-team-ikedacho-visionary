import React from 'react'
import './Comment.css'
import { useState } from 'react'
import ToComment from './ToComment'
const Comment = (props) => {
    const [like, setLike] = useState({
        liked: false,
    })

    const [state, setState] = useState({
        showReply: false,
    })

    const _showReply = () => {
        let cur = state.showReply
        setState({
            showReply: !cur,
        })
    }
    const _setLike = (e) => {
        let cur = like.liked
        setLike({
            liked: !cur,
        })
        if (cur == false) {
            e.target.style.backgroundColor = '#e37568'
        } else if (cur == true) {
            console.log('unliked')
            e.target.style.backgroundColor = '#e7e7e7'
        }
    }

    return (
        <div class='Comment'>
            <img class='img' src={props.img} alt={props.UserName} />
            <div class='Text'>
                <strong class='username'>{props.UserName}</strong>
                <p class='content'>{props.content}</p>
                <div class='Footer'>
                    <div id='datetime'>{props.Senttime}</div>
                    <div class='actions'>
                        <button class='Reply' onClick={_showReply.bind()}>
                            {' '}
                            Reply
                        </button>
                        <button class='Like' onClick={_setLike.bind()}>
                            {like.liked ? 'Liked' : 'Like'}
                        </button>
                    </div>
                </div>
                {state.showReply && (
                    <>
                        <ToComment />
                    </>
                )}
            </div>
        </div>
    )
}

export default Comment
