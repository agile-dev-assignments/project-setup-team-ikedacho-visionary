import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Liked from './Liked'
import { useHistory } from 'react-router-dom'

const Liked_List = (props) => {
    // start a state variable with a blank array
    const [data, setData] = useState([])
    let history = useHistory()

    useEffect(() => {
        axios
            .get('/api_liked_history', {
                params: {
                    /* INTENTIONALLY ADDED AS BLANK BY XINYU-BOT FOR POTENTIAL FUTURE NEED */
                },
            })
            .then((response) => {
                setData(response.data)
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
    }, [])

    console.log(data)

    return (
        <div className='Liked_List'>
            <Link to={'/me'}>
                <h1 id='back'>Back</h1>
            </Link>
            <h1 id='title'>Liked Content</h1>

            <section className='Liked_List'>
                {data.map((item) => (
                    <Liked
                        key={item.id}
                        source={item.source}
                        userimg={item.user_photo}
                        UserName={item.user_name}
                        content={item.text_content}
                        Senttime={item.post_issued_time}
                        contentimg={item.img_content}
                    />
                ))}
            </section>
        </div>
    )
}

export default Liked_List
