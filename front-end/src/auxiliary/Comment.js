import React from 'react'
import './Comment.css'
import { useState } from 'react'
import ToComment from './ToComment'
import { createBrowserHistory } from 'history'

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

    const history = createBrowserHistory({ forceRefresh: true })

    const _Friend_Profile_with_param = (event) => {
        event.preventDefault()
        const params = {
            UserName: props.UserName,
            userimg: props.userimg,
        }

        console.log(params)

        history.push({
            pathname: (params.UserName === props.self_username) ? '/my_profile' : '/friend_profile' ,
            state: params,
        })
    }

    return (
        <div class='Comment'>
            <img class='img' src={props.img} alt={props.UserName} onClick={_Friend_Profile_with_param.bind()}/>
            <div class='Text'>
                <strong class='username' onClick={_Friend_Profile_with_param.bind()}>{props.UserName}</strong>
                <p class='content'>{props.content}</p>
                <div class='Footer'>
                    <div id='datetime'>{props.Senttime}</div>
                </div>
               
            </div>
        </div>
    )
}

export default Comment
