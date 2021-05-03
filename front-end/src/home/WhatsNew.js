import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostContent from '../auxiliary/PostContent'
import './WhatsNew.css'
import { useHistory, useLocation } from 'react-router-dom'

const WhatsNew = (props) => {
    const [post_data, setData] = useState([])
    //const [userdata, setUserData] = useState([]);

    let history = useHistory()
    const [self_username, Set_self_username] = useState('')

    useEffect(() => {
        axios('/user').then((response) => {
            console.log(response.data)
            Set_self_username(response.data.username)
        })
    }, [])

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        axios
            .get('/api_whatsnew', {})
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
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
    }, []) // only run it once!

    return (
        <div className='WhatsNew'>
            <section className='main-content'>
                {post_data.map((item) => (
                    <PostContent 
                        key={item.id}
                        self_username={self_username}
                        like_switch={item.like_switch}
                        source={item.source}
                        userimg={item.userimg}
                        UserName={item.UserName}
                        content={item.content}
                        Senttime={item.senttime}
                        contentimg={item.contentimg}
                    />
                ))}
            </section>
        </div>
    )
}

export default WhatsNew
