import './PostContent.css'
import Repost from './ToRepost'
import React, { useState, useEffect } from 'react'
import ToComment from './ToComment'
import axios from 'axios'
import { createBrowserHistory } from 'history'

const PostContent = (props) => {
    const history = createBrowserHistory({ forceRefresh: true })

    const [state, setState] = useState({
        showRepost: false,
        showComment: false,
    })

    const [like, setLike] = useState({
        // check ../me/Liked.js
        // like_switch default to be TRUE when component is called from Like History page
        liked: props.like_switch,
    })

    const _showRepost = () => {
        let cur = state.showRepost
        if (state.showRepost === false) {
            axios
                .get('/get_add_repost', {
                    params: {
                        post_detail_for_repost: props,
                    },
                })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
        setState({
            showRepost: !cur,
        })
    }

    const _showComment = () => {
        let cur = state.showComment
        if (state.showComment === false) {
            axios
                .get('/get_add_comment', {
                    params: {
                        post_detail_for_comment: props,
                    },
                })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
        setState({
            showComment: !cur,
        })
    }
    const _setLike = () => {
        let cur = like.liked

        // if the action is to like a post
        if (!like.liked) {
            axios
                .get('/api_like_a_post', {
                    params: {
                        post_detail: props,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data)
                        setLike({
                            liked: !cur,
                        })
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
        } else {
            // otherwise, unlike it
            axios
                .get('/api_unlike_a_post', {
                    params: {
                        post_detail: props,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data)
                        setLike({
                            liked: !cur,
                        })
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        if (error.response.status === 501) {
                            console.log('Error 501: user is not login; req.user does not exist')
                            alert('You are not logged in. Please log in and try again!')
                            history.push('/prelogin')
                            setTimeout(() => {
                                window.location.href = window.location.href
                            }, 100)
                        }
                    }
                })
        }
    }

    const _PostDetail_with_param = (event) => {
        event.preventDefault()
        history.push({
            pathname: '/detailpost',
            state: props,
        })
    }

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
        <div className='PostContent'>
            <strong className='PlatformSource'>{props.source}</strong>

            <div className='block'>
                <img className='userimg' onClick={_Friend_Profile_with_param.bind()} src={props.userimg} />

                <div className='Text'>
                    <strong className='username' onClick={_Friend_Profile_with_param.bind()}>
                        {props.UserName}
                    </strong>
                    <p className='time'>{new Date(props.Senttime).toLocaleString()}</p>
                </div>
            </div>

            <div title='Go to Details' onClick={_PostDetail_with_param.bind()}>
                <p className='postcontent'>{props.content}</p>
                <img className='contentimg' src={props.contentimg} />
            </div>

            <div className='footer'>
                <button className='Commentbutton' onClick={_showComment.bind()}>
                    Comment
                </button>
                {/* inline style to show red Liked button when like_switch default to be TRUE*/}
                <button className='Likebutton' style={{ backgroundColor: like.liked ? '#e37568' : 'white' }} onClick={_setLike.bind()}>
                    {props.like_switch ? 'Liked' : 'Like'}
                </button>
                <button className='Repostbutton' onClick={_showRepost.bind()}>
                    Repost
                </button>

                {state.showRepost && (
                    <>
                        <Repost />
                    </>
                )}
                {state.showComment && (
                    <>
                        <ToComment />
                    </>
                )}
            </div>
        </div>
    )
}

export default PostContent
