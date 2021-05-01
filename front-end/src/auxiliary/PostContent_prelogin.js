import './PostContent.css'
import { Redirect, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
const PostContent = (props) => {
    const [state, setLike] = useState({
        login: false,
    })
    const history = useHistory()
    const _clicked = (e) => {
        setLike({
            login: true,
        })

        // if(state.login == true){
        //   console.log(state.login);
        history.push('/login')
    }

    return (
        <div className='PostContent'>
            <strong className='PlatformSource' onClick={_clicked.bind()}>
                {props.source}
            </strong>
            <div className='block' onClick={_clicked.bind()}>
                <img className='userimg' src={props.userimg} />
                <div className='Text'>
                    <strong className='username'>{props.UserName}</strong>
                    <p className='time'>{props.Senttime.slice(0, 10) + '   ' + props.Senttime.slice(11, 19)}</p>
                </div>
            </div>

            <p class='postcontent' onClick={_clicked.bind()}>
                {props.content}
            </p>
            <img class='contentimg' src={props.contentimg} />
            <div class='footer'>
                <button class='Commentbutton' onClick={_clicked.bind()}>
                    {' '}
                    Comment
                </button>

                <button class='Likebutton' onClick={_clicked.bind()}>
                    Like
                </button>
                <button class='Repostbutton' onClick={_clicked.bind()}>
                    {' '}
                    Repost
                </button>
            </div>
        </div>
    )
}

export default PostContent
