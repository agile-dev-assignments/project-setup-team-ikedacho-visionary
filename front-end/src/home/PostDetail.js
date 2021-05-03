import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostContent_noAction from '../auxiliary/PostContent_noAction'
import './PostDetail.css'
import { Link } from 'react-router-dom'
import Comment from '../auxiliary/Comment'
import { useHistory, useLocation } from 'react-router-dom'

const PostDetail = (props) => {
    let history = useHistory()

    const { state } = useLocation()
    //     props =
    // (props.location && props.location.props) || {};

    // setData(props.location.props);
    // console.log(props.location.props);
    const goTOPreviousPath = () => {
        history.goBack()
    }
    console.log(state)
    const [PostData, setPostData] = useState([{ id: 1, source: '', like_switch: true, UserName: '', user_photo: '', Content: '', contentimg: '', post_date: '' }])

    const [self_username, Set_self_username] = useState('')

    useEffect(() => {
        axios('/user').then((response) => {
            console.log(response.data)
            Set_self_username(response.data.username)
        })
    }, [])

    const date = new Date()

    // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

    useEffect(() => {
        if (state != undefined) {
            setPostData(state)
        }
        if (state.like_switch == undefined) {
            PostData.like_switch = false
        }
    }, []) // only run it once!

    useEffect(() => {
        axios
            .post('/browsed', {
                viewdate: date,
                senttime: state.Senttime,
                source: state.source,
                like_switch: state.like_switch,
                UserName: state.UserName,
                userimg: state.userimg,
                content: state.content,
                contentimgs: state.contentimg,
            })
            .then((response) => {
                if (response.data.status === 'created') {
                    console.log(response.data.status)
                } else {
                    console.log(response.data)
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
    }, [])

    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        axios
            .get('/get_comments_in_post_content', {
                params: {
                    user_name: state.UserName,
                    content: state.content,
                },
            })
            .then((response) => {
                // extract the data from the server response
                console.log(response.data)
                setData(response.data)
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 501) {
                        console.log('Error 501: user is not login; req.user does not exist')
                        history.push('/prelogin')
                        setTimeout(() => {
                            window.location.href = window.location.href
                        }, 100)
                    }
                }
            })
    }, [])

    return (
        <div className='PostDetail'>
            <Link onClick={goTOPreviousPath}>
                <h1 id='back'>Back</h1>
            </Link>
            <h1 id='title'>Post Content</h1>
            <div className='Postfield'>
                <section className='main-content'>
                    <PostContent_noAction
                        source={PostData.source}
                        userimg={PostData.userimg}
                        UserName={PostData.UserName}
                        content={PostData.content}
                        Senttime={PostData.Senttime}
                        contentimg={PostData.contentimg}
                    />
                </section>
            </div>
            <h1 id='title'>Comments</h1>
            <div className='comments'>
                <section className='comment_list'>
                    {data.map((item) => (
                        <Comment key={item.id} img={item.userimg} UserName={item.UserName} content={item.content} datetime={item.Senttime} />
                    ))}
                </section>
            </div>
        </div>
    )
}

export default PostDetail
