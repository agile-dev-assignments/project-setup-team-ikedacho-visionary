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

    const [PostData, setPostData] = useState([{ id: 1, source: '', UserName: '', user_photo: '', Content: '', contentimg: '', post_date: '' }])

    const [self_username, Set_self_username] = useState('')

    useEffect(() => {
        axios('/user').then((response) => {
            console.log(response.data)
            Set_self_username(response.data.username)
        })
    }, [])

    var today = new Date()

    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

    useEffect(() => {
        if (state != undefined) {
            setPostData(state)
        }
    }, []) // only run it once!
    console.log(state)

    useEffect(() => {

        axios
        .post("/browsed",
        {
            viewdate : date,
            UserName : state.UserName,
            userimg : state.userimg,
            content : state.content,
            contentimgs: state.contentimg
        })
        .then((response) => {
            if (response.data.status === 'created') {
                console.log(response.data.status)
            } else {
                console.log(response.data)
            }
            })
            .catch(error => {
                console.log("unable to save browse history", error);
                })
            }, [])


    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {
       axios
            .get('/get_comments_in_post_content',
        {
            params: {
                user_name :  state.UserName,
                content : state.content
            }
        })
            .then((response) => {
                // extract the data from the server response
                console.log(response.data)
                setData(response.data)
            })
            .catch((err) => {     
                console.log(err)     
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
